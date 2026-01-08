import { AlertCircle, FileText, Loader2, Upload, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { courseStorage } from '@/lib/storage';
import { GeminiService } from '@/services/gemini';
import { Course } from '@/types/types';
import { gradePoints, getGradePoints } from '@/lib/university-rules';

interface TranscriptUploadProps {
  onSuccess: () => void;
}

export function TranscriptUpload({ onSuccess }: TranscriptUploadProps) {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractedCourses, setExtractedCourses] = useState<Course[]>([]);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [needsApiKey, setNeedsApiKey] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setLoading(true);
    setError(null);
    setExtractedCourses([]);
    setNeedsApiKey(false);

    try {
      // Use stored key or env key
      const service = new GeminiService(apiKey);
      const allCourses: Course[] = [];

      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];
        try {
           const courses = await service.extractCoursesFromImage(file);
           allCourses.push(...courses);
        } catch (err: any) {
           console.error(`Error processing file ${file.name}:`, err);
           // We continue processing other files even if one fails, but we track the error
           if (err.message === 'MISSING_API_KEY') {
             throw err; // Stop immediately for missing API key
           }
        }
      }
      
      if (allCourses.length === 0 && acceptedFiles.length > 0) {
         throw new Error("Failed to extract courses from any of the uploaded images.");
      }

      setExtractedCourses(allCourses);
    } catch (err: any) {
      console.error(err);
      if (err.message === 'MISSING_API_KEY') {
        setNeedsApiKey(true);
      } else {
        const errorMsg = err instanceof Error ? err.message : String(err);
        setError(language === 'ar' 
          ? `حدث خطأ أثناء تحليل الصورة: ${errorMsg}` 
          : `Error analyzing image: ${errorMsg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: undefined // Allow multiple files
  });

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setNeedsApiKey(false);
      // Retry logic could be added here, but for now just ask user to re-upload
      setError(null);
    }
  };

  const handleConfirmCourses = () => {
    const currentCourses = courseStorage.getAll();
    const newCourses = [...currentCourses, ...extractedCourses];
    courseStorage.save(newCourses);
    setOpen(false);
    setExtractedCourses([]);
    onSuccess();
  };

  const updateCourse = (index: number, field: keyof Course, value: any) => {
    const updated = [...extractedCourses];
    const course = { ...updated[index], [field]: value };
    
    // Auto-recalculate grade points if grade changes
    if (field === 'grade') {
      course.gradePoints = getGradePoints(value as string);
    }
    
    updated[index] = course;
    setExtractedCourses(updated);
  };

  const removeCourse = (index: number) => {
    const updated = extractedCourses.filter((_, i) => i !== index);
    setExtractedCourses(updated);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="h-4 w-4 me-2" />
          {language === 'ar' ? 'رفع كشف درجات' : 'Upload Transcript'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {language === 'ar' ? 'استخراج المقررات من الصور' : 'Extract Courses from Images'}
          </DialogTitle>
        </DialogHeader>

        {needsApiKey ? (
          <div className="space-y-4 py-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{language === 'ar' ? 'مطلوب مفتاح API' : 'API Key Required'}</AlertTitle>
              <AlertDescription>
                {language === 'ar' 
                  ? 'هذه الميزة تتطلب مفتاح Google Gemini API. الرجاء إدخاله أدناه (سيتم حفظه محلياً).' 
                  : 'This feature requires a Google Gemini API Key. Please enter it below (saved locally).'}
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Label>Gemini API Key</Label>
              <Input 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)} 
                type="password" 
                placeholder="AIzaSy..." 
              />
              <Button onClick={handleSaveApiKey} className="w-full">
                {language === 'ar' ? 'حفظ ومتابعة' : 'Save & Continue'}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="underline">
                  {language === 'ar' ? 'احصل على مفتاح مجاني من هنا' : 'Get a free key here'}
                </a>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 flex-1 overflow-hidden flex flex-col">
            {!extractedCourses.length && (
              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors
                  ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}
                `}
              >
                <input {...getInputProps()} />
                {loading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'جاري تحليل الصور...' : 'Analyzing images...'}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                    <p className="font-medium">
                      {language === 'ar' 
                        ? 'اسحب الصور هنا أو اضغط للاختيار' 
                        : 'Drag images here or click to select'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, JPEG
                    </p>
                  </div>
                )}
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{language === 'ar' ? 'خطأ' : 'Error'}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {extractedCourses.length > 0 && (
              <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                <div className="flex items-center justify-between shrink-0">
                  <h3 className="font-semibold">
                    {language === 'ar' 
                      ? `تم العثور على ${extractedCourses.length} مقررات (يرجى المراجعة)` 
                      : `Found ${extractedCourses.length} courses (Please Verify)`}
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setExtractedCourses([])}>
                    {language === 'ar' ? 'إعادة الرفع' : 'Re-upload'}
                  </Button>
                </div>
                
                <div className="flex-1 overflow-y-auto border rounded-md p-2">
                  <div className="space-y-3">
                    {extractedCourses.map((course, idx) => (
                      <div key={idx} className="flex flex-col gap-3 p-3 bg-muted/50 rounded-lg border">
                        {/* Row 1: Course Name */}
                        <Input 
                          value={course.courseName} 
                          onChange={(e) => updateCourse(idx, 'courseName', e.target.value)}
                          placeholder="Course Name"
                          className="h-8 text-sm font-medium w-full"
                        />
                        
                        {/* Row 2: Details */}
                        <div className="flex flex-wrap items-center gap-2">
                          <Input 
                            value={course.courseCode} 
                            onChange={(e) => updateCourse(idx, 'courseCode', e.target.value)}
                            placeholder="Code"
                            className="h-8 text-xs w-24 shrink-0"
                          />

                          <Select 
                            value={course.semester} 
                            onValueChange={(v) => updateCourse(idx, 'semester', v)}
                          >
                            <SelectTrigger className="h-8 w-24 shrink-0">
                              <SelectValue placeholder="Sem" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Fall">Fall</SelectItem>
                              <SelectItem value="Spring">Spring</SelectItem>
                              <SelectItem value="Summer">Summer</SelectItem>
                            </SelectContent>
                          </Select>

                          <Input 
                            type="number" 
                            value={course.year} 
                            onChange={(e) => updateCourse(idx, 'year', Number(e.target.value))}
                            className="h-8 w-20 shrink-0"
                            placeholder="Year"
                          />

                          <Select 
                            value={course.grade} 
                            onValueChange={(v) => updateCourse(idx, 'grade', v)}
                          >
                            <SelectTrigger className="h-8 w-20 shrink-0">
                              <SelectValue placeholder="Grade" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(gradePoints).map((g) => (
                                <SelectItem key={g} value={g}>{g}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Input 
                            type="number" 
                            value={course.creditHours} 
                            onChange={(e) => updateCourse(idx, 'creditHours', Number(e.target.value))}
                            className="h-8 w-16 shrink-0"
                            min={0}
                            max={10}
                            title="Credit Hours"
                          />

                          <div className="flex-1" /> {/* Spacer */}

                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:text-destructive/90 shrink-0"
                            onClick={() => removeCourse(idx)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                 <div className="shrink-0 flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </Button>
                  <Button onClick={handleConfirmCourses}>
                    {language === 'ar' ? 'حفظ المقررات' : 'Save Courses'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Only show Footer if not showing courses (since we moved buttons inside) */}
        {!extractedCourses.length && !needsApiKey && (
          <DialogFooter>
             <Button variant="outline" onClick={() => setOpen(false)}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
