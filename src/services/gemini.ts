import { GoogleGenerativeAI } from "@google/generative-ai";
import { getGradePoints } from "@/lib/university-rules";
import { Course, GradeSymbol } from "@/types/types";

// Helper to convert File to Base64
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
};

function normalizeGrade(input: string): GradeSymbol {
  const normalized = input.trim().toUpperCase();
  // Map common variations to supported GradeSymbol types
  // Supported: 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'F'
  const map: Record<string, GradeSymbol> = {
    'A+': 'A', 'A': 'A', 'A-': 'A-',
    'B+': 'B+', 'B': 'B', 'B-': 'B-',
    'C+': 'C+', 'C': 'C', 'C-': 'C', // Map C- to C if not supported
    'D+': 'D', 'D': 'D', 'D-': 'D',
    'F': 'F'
  };

  return map[normalized] || 'F'; // Default to F if unknown
}

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || "";
    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

  async extractCoursesFromImage(file: File): Promise<Course[]> {
    if (!this.apiKey) {
      throw new Error("MISSING_API_KEY");
    }

    const prompt = `
      Analyze this academic transcript/grade report image.
      Extract all courses, their credit hours, and grades.
      
      Return ONLY a valid JSON array of objects with this structure:
      [
        {
          "courseName": "Course Name",
          "courseCode": "Course Code (e.g. CS101) or empty string",
          "creditHours": number (credit hours),
          "grade": "Grade (A, B+, etc.)",
          "semester": "Fall" or "Spring" or "Summer",
          "year": number (Academic Year Start)
        }
      ]
      
      Rules:
      1. "year" MUST be the Academic Year Start. 
         - "Spring 2024" is part of Academic Year 2023-2024 -> return 2023.
         - "Summer 2024" is part of Academic Year 2023-2024 -> return 2023.
         - "Fall 2024" is part of Academic Year 2024-2025 -> return 2024.
         - General Rule: If semester is Spring or Summer, year = calendar year - 1. If Fall, year = calendar year.
      2. "courseCode" MUST be normalized: Uppercase, NO spaces. (e.g. "CS 101" -> "CS101").
      3. Normalize grades to standard letter grades (A, A-, B+, B, B-, C+, C, D, F).
      4. If credit hours are missing, default to 3.
      5. Ignore non-course rows.
      6. Do not include markdown formatting.
    `;

    const imagePart = await fileToGenerativePart(file);
    
    // Try multiple models based on available models for this key
    const modelsToTry = [
      "gemini-2.0-flash-lite", // Try lite first for speed/quota
      "gemini-2.0-flash",      // Standard flash
      "gemini-2.5-flash",      // New flash
      "gemini-flash-latest"    // Fallback alias
    ];
    
    const errors: string[] = [];

    // Diagnostic: Check available models if first attempt fails
    let availableModelsLog = "";

    for (const modelName of modelsToTry) {
      try {
        const model = this.genAI.getGenerativeModel({ 
            model: modelName,
            generationConfig: { responseMimeType: "application/json" }
        });
        const result = await model.generateContent([prompt, imagePart as any]);
        const response = await result.response;
        const text = response.text();
        
        const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();
        
        let rawCourses;
        try {
          rawCourses = JSON.parse(jsonString);
        } catch (e) {
          console.error(`JSON Parse Error (${modelName}):`, e);
          errors.push(`${modelName}: JSON Parse Error`);
          if (modelName !== modelsToTry[modelsToTry.length - 1]) continue;
          throw new Error('FAILED_TO_PARSE_JSON');
        }

        if (!Array.isArray(rawCourses)) {
           errors.push(`${modelName}: Invalid Response Format`);
           if (modelName !== modelsToTry[modelsToTry.length - 1]) continue;
           throw new Error('INVALID_RESPONSE_FORMAT');
        }
        
        return rawCourses.map((c: any) => {
          const grade = normalizeGrade(c.grade || "A");
          return {
            id: crypto.randomUUID(),
            userId: 'default-user',
            universityId: 'default-university',
            courseName: c.courseName || "Unknown Course",
            courseCode: c.courseCode || "",
            creditHours: Number(c.creditHours) || 3,
            grade: grade,
            gradePoints: getGradePoints(grade),
            semester: c.semester || "Fall",
            year: Number(c.year) || new Date().getFullYear(),
            isRetake: false,
            createdAt: new Date().toISOString()
          } as Course;
        });

      } catch (e: any) {
        console.error(`Model ${modelName} failed:`, e);
        const errorMessage = e.message || String(e);
        errors.push(`${modelName}: ${errorMessage}`);
        
        if (errors.length === 1 && !availableModelsLog) {
            try {
                const listResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`);
                const listData = await listResp.json();
                if (listData.models) {
                    availableModelsLog = "Available models: " + listData.models.map((m: any) => m.name.replace('models/', '')).join(', ');
                } else if (listData.error) {
                    availableModelsLog = "ListModels Error: " + listData.error.message;
                }
            } catch (listErr) {
                console.error("Failed to list models:", listErr);
            }
        }
        
        continue;
      }
    }
    
    // Throw a comprehensive error with details for all attempts
    throw new Error(`All models failed. \nDebug Info: ${availableModelsLog || "Could not list models"}. \nDetails: \n${errors.join('\n')}`);
  }
}
