import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { CourseForm } from '@/components/courses/CourseForm';
import { CourseList } from '@/components/courses/CourseList';
import { GPACard } from '@/components/gpa/GPACard';
import { courseApi, profileApi } from '@/db/api';
import { GPAEngine } from '@/lib/gpa-engine';
import type { Course, GPACalculation } from '@/types/types';
import { Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CalculatorPage() {
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [gpaCalc, setGpaCalc] = useState<GPACalculation | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
    ensureUniversitySet();
  }, [user]);

  const ensureUniversitySet = async () => {
    if (!user || !profile) return;
    
    // Set default university if not set
    if (!profile.universityId) {
      try {
        await profileApi.updateProfile(user.id, {
          universityId: 'default-university'
        });
      } catch (error) {
        console.error('Error setting default university:', error);
      }
    }
  };

  const loadCourses = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const coursesData = await courseApi.getCourses(user.id);
      setCourses(coursesData);
      
      if (coursesData.length > 0) {
        const calculation = GPAEngine.calculateGPA(coursesData);
        setGpaCalc(calculation);
      } else {
        setGpaCalc(null);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64 bg-muted" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 bg-muted" />
          ))}
        </div>
        <Skeleton className="h-96 bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('nav.calculator')}</h1>
          <p className="text-muted-foreground mt-2">
            Manage your courses and track your GPA
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="h-4 w-4 me-2" />
          {t('course.add')}
        </Button>
      </div>

      {/* GPA Summary */}
      {gpaCalc && (
        <div className="grid gap-4 md:grid-cols-3">
          <GPACard
            title={t('dashboard.cumulativeGPA')}
            gpa={gpaCalc.cumulativeGPA}
            classification={gpaCalc.classification}
            classificationNameEn={gpaCalc.classificationNameEn}
            classificationNameAr={gpaCalc.classificationNameAr}
          />
          <GPACard
            title={t('dashboard.currentGPA')}
            gpa={gpaCalc.currentGPA}
            subtitle={gpaCalc.semesters.length > 0 
              ? `${gpaCalc.semesters[gpaCalc.semesters.length - 1].semester} ${gpaCalc.semesters[gpaCalc.semesters.length - 1].year}`
              : undefined
            }
          />
          <GPACard
            title="Total Quality Points"
            gpa={gpaCalc.totalQualityPoints}
            subtitle={`${gpaCalc.totalPassedHours} / ${gpaCalc.totalRegisteredHours} hours passed`}
          />
        </div>
      )}

      {/* Courses List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
        <CourseList courses={courses} onCoursesChange={loadCourses} />
      </div>

      <CourseForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSuccess={loadCourses}
      />
    </div>
  );
}
