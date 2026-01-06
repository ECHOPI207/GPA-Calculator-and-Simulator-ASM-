import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { GPACard, StatCard } from '@/components/gpa/GPACard';
import { courseStorage } from '@/lib/storage';
import { GPAEngine } from '@/lib/gpa-engine';
import type { Course, GPACalculation } from '@/types/types';
import { GraduationCap, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  const { t, language } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [gpaCalc, setGpaCalc] = useState<GPACalculation | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allCourses = courseStorage.getAll();
    setCourses(allCourses);
    
    if (allCourses.length > 0) {
      const calculation = GPAEngine.calculateGPA(allCourses);
      setGpaCalc(calculation);
    }
  };

  if (courses.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground mt-2">{t('app.tagline')}</p>
        </div>
        
        <Card className="border-2 border-dashed border-border">
          <CardContent className="py-16 text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-primary/10 p-6">
                <GraduationCap className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">
              {language === 'ar' ? 'لا توجد مقررات' : 'No courses added yet'}
            </h3>
            <p className="text-muted-foreground text-lg mb-6 max-w-md mx-auto">
              {language === 'ar' 
                ? 'ابدأ بإضافة مقرراتك الدراسية في صفحة حاسبة المعدل لتتبع أدائك الأكاديمي'
                : 'Start by adding your courses in the Calculator page to track your academic performance'}
            </p>
            <Button asChild size="lg" className="font-semibold">
              <Link to="/calculator">
                <Plus className="h-5 w-5 me-2" />
                {language === 'ar' ? 'إضافة مقررات' : 'Add Courses'}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const recentCourses = [...courses]
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      const semesterOrder = { Fall: 3, Spring: 2, Summer: 1 };
      return semesterOrder[b.semester] - semesterOrder[a.semester];
    })
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* العنوان */}
      <div>
        <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground mt-2">{t('app.tagline')}</p>
      </div>

      {/* بطاقات المعدل */}
      {gpaCalc && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <GPACard
            title={t('gpa.cumulative')}
            gpa={gpaCalc.cumulativeGPA}
            classification={gpaCalc.classification}
          />
          <StatCard
            title={t('course.totalHours')}
            value={gpaCalc.totalRegisteredHours.toString()}
          />
          <StatCard
            title={t('course.passedHours')}
            value={gpaCalc.totalPassedHours.toString()}
          />
          <StatCard
            title={t('course.totalCourses')}
            value={courses.length.toString()}
          />
        </div>
      )}

      {/* المقررات الأخيرة */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ar' ? 'المقررات الأخيرة' : 'Recent Courses'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium">{course.courseName}</div>
                  <div className="text-sm text-muted-foreground">
                    {course.courseCode} • {course.semester} {course.year}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{course.creditHours} {language === 'ar' ? 'ساعة' : 'hrs'}</Badge>
                  <Badge className="bg-primary text-primary-foreground">{course.grade}</Badge>
                </div>
              </div>
            ))}
          </div>
          <Button asChild variant="outline" className="w-full mt-4">
            <Link to="/calculator">
              {language === 'ar' ? 'عرض جميع المقررات' : 'View All Courses'}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
