import { AlertCircle, Check, FileText, Loader2, Upload } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import { courseStorage } from '@/lib/storage';
import { GeminiService } from '@/services/gemini';
import { Course } from '@/types/types';

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

    const file = acceptedFiles[0];
    setLoading(true);
    setError(null);
    setExtractedCourses([]);
    setNeedsApiKey(false);

    try {
      // Use stored key or env key
      const service = new GeminiService(apiKey);
      const courses = await service.extractCoursesFromImage(file);
      setExtractedCourses(courses);
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
    maxFiles: 1
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="h-4 w-4 me-2" />
          {language === 'ar' ? 'رفع كشف درجات' : 'Upload Transcript'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {language === 'ar' ? 'استخراج المقررات من الصورة' : 'Extract Courses from Image'}
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
          <div className="space-y-6">
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
                      {language === 'ar' ? 'جاري تحليل الصورة...' : 'Analyzing image...'}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                    <p className="font-medium">
                      {language === 'ar' 
                        ? 'اسحب الصورة هنا أو اضغط للاختيار' 
                        : 'Drag image here or click to select'}
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
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    {language === 'ar' 
                      ? `تم العثور على ${extractedCourses.length} مقررات` 
                      : `Found ${extractedCourses.length} courses`}
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setExtractedCourses([])}>
                    {language === 'ar' ? 'إعادة الرفع' : 'Re-upload'}
                  </Button>
                </div>
                
                <ScrollArea className="h-[200px] border rounded-md p-2">
                  <div className="space-y-2">
                    {extractedCourses.map((course, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                        <div className="font-medium">{course.courseName} <span className="text-muted-foreground">({course.courseCode})</span></div>
                        <div className="flex items-center gap-2">
                          <span className="bg-background px-2 py-0.5 rounded border">{course.grade}</span>
                          <span className="text-muted-foreground">{course.creditHours} hrs</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          {extractedCourses.length > 0 && (
            <Button onClick={handleConfirmCourses} className="w-full sm:w-auto">
              <Check className="h-4 w-4 me-2" />
              {language === 'ar' ? 'إضافة المقررات' : 'Add Courses'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
