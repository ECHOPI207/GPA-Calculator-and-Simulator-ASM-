import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { courseStorage } from "@/lib/storage";
import { getGradePoints } from '@/lib/university-rules';
import type { Course, GradeSymbol } from '@/types/types';

interface CourseFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course?: Course;
  onSuccess: () => void;
}

const GRADE_OPTIONS: GradeSymbol[] = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'];
const SEMESTER_OPTIONS = ['Fall', 'Spring', 'Summer'];

export function CourseForm({ open, onOpenChange, course, onSuccess }: CourseFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [courseCode, setCourseCode] = useState(course?.courseCode || '');
  const [courseName, setCourseName] = useState(course?.courseName || '');
  const [creditHours, setCreditHours] = useState(course?.creditHours?.toString() || '3');
  const [grade, setGrade] = useState<GradeSymbol>(course?.grade || 'A');
  const [semester, setSemester] = useState(course?.semester || 'Fall');
  const [year, setYear] = useState(course?.year?.toString() || new Date().getFullYear().toString());
  const [isRetake, setIsRetake] = useState(course?.isRetake || false);
  const [loading, setLoading] = useState(false);

  // تحديث الحقول عند تغيير المقرر (للتعديل)
  useEffect(() => {
    if (course && open) {
      setCourseCode(course.courseCode);
      setCourseName(course.courseName);
      setCreditHours(course.creditHours.toString());
      setGrade(course.grade);
      setSemester(course.semester);
      setYear(course.year.toString());
      setIsRetake(course.isRetake);
    } else if (!course && open) {
      // إعادة تعيين النموذج للإضافة
      setCourseCode('');
      setCourseName('');
      setCreditHours('3');
      setGrade('A');
      setSemester('Fall');
      setYear(new Date().getFullYear().toString());
      setIsRetake(false);
    }
  }, [course, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    setLoading(true);
    try {
      const gradePoints = getGradePoints(grade);
      const courseData = {
        userId: "local-user",
        universityId: "default",
        courseCode,
        courseName,
        creditHours: Number.parseInt(creditHours),
        grade,
        gradePoints,
        semester,
        year: Number.parseInt(year),
        isRetake,
        originalCourseId: course?.originalCourseId
      };

      if (course) {
        courseStorage.update(course.id, courseData);
        toast({
          title: t('common.success'),
          description: t('message.courseUpdated'),
        });
      } else {
        courseStorage.add(courseData);
        toast({
          title: t('common.success'),
          description: t('message.courseAdded'),
        });
      }

      onSuccess();
      onOpenChange(false);
      resetForm();
    } catch (error) {
      toast({
        title: t('common.error'),
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCourseCode('');
    setCourseName('');
    setCreditHours('3');
    setGrade('A');
    setSemester('Fall');
    setYear(new Date().getFullYear().toString());
    setIsRetake(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {course ? t('course.edit') : t('course.add')}
          </DialogTitle>
          <DialogDescription>
            {course ? 'Edit course information' : 'Add a new course to your academic record'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courseCode">{t('course.code')}</Label>
                <Input
                  id="courseCode"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  required
                  placeholder="CS101"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creditHours">{t('course.credits')}</Label>
                <Input
                  id="creditHours"
                  type="number"
                  min="1"
                  max="6"
                  value={creditHours}
                  onChange={(e) => setCreditHours(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseName">{t('course.name')}</Label>
              <Input
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
                placeholder="Introduction to Computer Science"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grade">{t('course.grade')}</Label>
                <Select value={grade} onValueChange={(value) => setGrade(value as GradeSymbol)}>
                  <SelectTrigger id="grade">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADE_OPTIONS.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="semester">{t('course.semester')}</Label>
                <Select value={semester} onValueChange={setSemester}>
                  <SelectTrigger id="semester">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SEMESTER_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">{t('course.year')}</Label>
                <Input
                  id="year"
                  type="number"
                  min="2000"
                  max="2100"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  {t('course.year') === 'السنة' 
                    ? 'أدخل سنة بداية العام الأكاديمي (مثلاً: لعام 2023/2024 أدخل 2023)' 
                    : 'Enter Academic Year Start (e.g. for 2023/2024 enter 2023)'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isRetake"
                checked={isRetake}
                onCheckedChange={(checked) => setIsRetake(checked as boolean)}
              />
              <Label htmlFor="isRetake" className="cursor-pointer">
                {t('course.isRetake')}
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t('common.loading') : t('common.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
