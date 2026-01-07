import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CourseForm } from '@/components/courses/CourseForm';
import { CourseList } from '@/components/courses/CourseList';
import { TranscriptUpload } from '@/components/courses/TranscriptUpload';
import { GPACard } from '@/components/gpa/GPACard';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { GPAEngine } from '@/lib/gpa-engine';
import { courseStorage } from '@/lib/storage';
import type { Course, GPACalculation } from '@/types/types';

export default function CalculatorPage() {
  const { t } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [gpaCalc, setGpaCalc] = useState<GPACalculation | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    const coursesData = courseStorage.getAll();
    setCourses(coursesData);
    
    if (coursesData.length > 0) {
      const calculation = GPAEngine.calculateGPA(coursesData);
      setGpaCalc(calculation);
    } else {
      setGpaCalc(null); // Clear GPA if no courses
    }
  };

  const handleCourseAdded = () => {
    loadCourses();
    setFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('nav.calculator')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('course.manageCourses')}
          </p>
        </div>
        <div className="flex gap-2">
          <TranscriptUpload onSuccess={loadCourses} />
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="h-4 w-4 me-2" />
            {t('course.add')}
          </Button>
        </div>
      </div>

      {/* ملخص المعدل */}
      {gpaCalc && (
        <div className="grid gap-4 md:grid-cols-3">
          <GPACard
            title={t('gpa.cumulative')}
            gpa={gpaCalc.cumulativeGPA}
            classification={gpaCalc.classification}
          />
          <GPACard
            title={t('gpa.current')}
            gpa={gpaCalc.currentGPA}
          />
          <GPACard
            title={t('course.totalHours')}
            gpa={gpaCalc.totalRegisteredHours}
          />
        </div>
      )}

      {/* قائمة المقررات */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('course.yourCourses')}</h2>
        <CourseList courses={courses} onCoursesChange={loadCourses} />
      </div>

      <CourseForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSuccess={handleCourseAdded}
      />
    </div>
  );
}
