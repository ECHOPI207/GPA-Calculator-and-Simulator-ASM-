import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { GPACard, StatCard } from '@/components/gpa/GPACard';
import { courseStorage, clpStorage } from '@/lib/storage';
import { GPAEngine } from '@/lib/gpa-engine';
import type { Course, GPACalculation } from '@/types/types';
import { GraduationCap, Plus, TrendingUp, Brain } from 'lucide-react';
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
        <>
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

          {/* بطاقة تحسين المعدل */}
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">
                    {language === 'ar' ? 'هل تريد تحسين معدلك؟' : 'Want to improve your GPA?'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === 'ar'
                      ? 'احصل على تحليل ذكي وتوصيات مخصصة لتحسين معدلك الأكاديمي بناءً على بياناتك الحالية'
                      : 'Get intelligent analysis and personalized recommendations to improve your academic GPA based on your current data'}
                  </p>
                  <Button asChild>
                    <Link to="/improvement">
                      <TrendingUp className="h-4 w-4 me-2" />
                      {language === 'ar' ? 'عرض التحليل الذكي' : 'View Smart Analysis'}
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* بطاقة ملف التعلم المعرفي */}
          <Card className="bg-gradient-to-br from-blue-50 to-background dark:from-blue-950/20 border-blue-200 dark:border-blue-900">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-500/10 p-3">
                  <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">
                    {language === 'ar' ? 'افهم كيف تتعلم' : 'Understand How You Learn'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === 'ar'
                      ? 'أكمل تقييم سلوكي قصير للحصول على استراتيجيات مذاكرة مخصصة تناسب أسلوبك الدراسي'
                      : 'Complete a short behavioral assessment to get personalized study strategies that match your learning style'}
                  </p>
                  {clpStorage.exists() ? (
                    <div className="flex gap-2">
                      <Button asChild>
                        <Link to="/integrated-plan">
                          <Brain className="h-4 w-4 me-2" />
                          {language === 'ar' ? 'خطتك المتكاملة' : 'Your Integrated Plan'}
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link to="/clp-results">
                          {language === 'ar' ? 'عرض الملف' : 'View Profile'}
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <Button asChild variant="outline">
                      <Link to="/clp-assessment">
                        <Brain className="h-4 w-4 me-2" />
                        {language === 'ar' ? 'ابدأ التقييم' : 'Start Assessment'}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* المعدلات الفصلية */}
      {gpaCalc && gpaCalc.semesters.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{language === 'ar' ? 'المعدلات الفصلية' : 'Semester GPAs'}</CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link to="/timeline">
                  {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {gpaCalc.semesters.map((semester, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    {semester.semester} {semester.year}
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {semester.semesterGPA.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{semester.totalCredits} {language === 'ar' ? 'ساعة' : 'hrs'}</span>
                    <span>•</span>
                    <span>{semester.courses.length} {language === 'ar' ? 'مقرر' : 'courses'}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
