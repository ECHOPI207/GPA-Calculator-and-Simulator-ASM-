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
  // Supported: 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'F'
  const map: Record<string, GradeSymbol> = {
    'A+': 'A', 'A': 'A', 'A-': 'A-',
    'B+': 'B+', 'B': 'B', 'B-': 'B-',
    'C+': 'C+', 'C': 'C', 'C-': 'C-',
    'D+': 'D+', 'D': 'D', 'D-': 'D',
    'F': 'F'
  };

  return map[normalized] || 'F'; // Default to F if unknown
}

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private apiKey: string;

  constructor(apiKey?: string) {
    // Prioritize explicitly provided key (if valid), otherwise fallback to Env Var
    const providedKey = apiKey?.trim();
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;

    this.apiKey = providedKey || envKey || "";

    // Log for debugging (will show in browser console)
    if (!this.apiKey) {
      console.warn("Gemini Service: No API Key found in constructor or environment variables.");
    } else {
      console.log("Gemini Service: API Key initialized successfully.");
    }

    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

  async extractCoursesFromImage(file: File): Promise<Course[]> {
    if (!this.apiKey) {
      throw new Error("MISSING_API_KEY");
    }

    const prompt = `
      Analyze this academic transcript/grade report image.
      
      Step 1: First, SCAN the entire image for headers indicating the Academic Year and Semester. 
              Examples: "Fall 2023", "First Semester 2024", "Term 2 2023-2024", "Spring 2022-2023", "Summer 2023".
              Look for Arabic terms: "خريف" (Fall), "ربيع" (Spring), "صيف" (Summer), "الأول" (First), "الثاني" (Second).
              Look at the top of the document or table headers.
              
      Step 2: Identify the columns for Course Name, Course Code, Credit Hours, and Grade.
      Step 3: Extract each row carefully.
      Step 4: DOUBLE CHECK the Grade and Credit Hours for each course. Ensure you are reading the correct column.
      Step 5: CRITICAL: Look very closely for "+" and "-" signs next to grades. They can be small or faint. 
              - "B" is different from "B+".
              - "A" is different from "A-".
              - "D" is different from "D+".
      
      Return ONLY a valid JSON array of objects with this structure:
      [
        {
          "courseName": "Course Name",
          "courseCode": "Course Code (e.g. AMS101) or empty string",
          "creditHours": number (credit hours),
          "grade": "Grade (A, B+, etc.)",
          "semester": "Fall" or "Spring" or "Summer",
          "year": number (Academic Year Start)
        }
      ]
      
      Rules for "year" and "semester":
      1. CRITICAL: "year" MUST be the ACADEMIC YEAR START YEAR.
         - Academic Year 2023-2024 starts in 2023.
         - "Fall 2023" (or "خريف") -> semester: "Fall", year: 2023.
         - "First Semester 2023-2024" (or "الفصل الأول") -> semester: "Fall", year: 2023.
         - "Spring 2024" (or "ربيع") is part of Academic Year 2023-2024 -> semester: "Spring", year: 2023.
         - "Second Semester 2023-2024" (or "الفصل الثاني") -> semester: "Spring", year: 2023.
         - "Summer 2024" (or "صيف") is part of Academic Year 2023-2024 -> semester: "Summer", year: 2023.
         
         General Algorithm:
         - If text says "Spring YYYY" (or Arabic equivalent), the Academic Year is (YYYY-1). Return (YYYY-1).
         - If text says "Summer YYYY" (or Arabic equivalent), the Academic Year is (YYYY-1). Return (YYYY-1).
         - If text says "Fall YYYY" (or Arabic equivalent), the Academic Year is YYYY. Return YYYY.
         - If text says "YYYY-YYYY+1", return YYYY.

      2. "courseCode" MUST be normalized: Uppercase, NO spaces. (e.g. "CS 101" -> "CS101").
      3. Normalize grades to standard letter grades:
         - Supported: A, A-, B+, B, B-, C+, C, D, D+, F.
         - Note: Some universities use D+, map it correctly.
         - If a numeric grade is found (e.g., 3.7), convert to nearest letter if possible, but prefer the letter grade column.
      4. If credit hours are missing, default to 3.
      5. Ignore non-course rows (like GPA summaries).
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
        console.log(`Gemini Raw Response (${modelName}):`, jsonString);

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
