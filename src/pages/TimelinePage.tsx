import { Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { GPAEngine } from '@/lib/gpa-engine';
import { courseStorage, scenarioStorage } from "@/lib/storage";
import type { Course, SemesterSummary } from '@/types/types';

export default function TimelinePage() {
  
  const { t, language } = useLanguage();
  const [semesters, setSemesters] = useState<SemesterSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    
    
    setLoading(true);
    try {
      const coursesData = courseStorage.getAll();
      
      if (coursesData.length > 0) {
        const calculation = GPAEngine.calculateGPA(coursesData);
        setSemesters(calculation.semesters);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrend = (index: number) => {
    if (index === 0) return 'neutral';
    const current = semesters[index].semesterGPA;
    const previous = semesters[index - 1].semesterGPA;
    if (current > previous + 0.1) return 'up';
    if (current < previous - 0.1) return 'down';
    return 'neutral';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64 bg-muted" />
        <Skeleton className="h-96 bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('timeline.title')}</h1>
        <p className="text-muted-foreground mt-2">
          {language === 'ar' ? 'تتبع أدائك الأكاديمي عبر الفصول الدراسية' : 'Track your academic performance over time'}
        </p>
      </div>

      {semesters.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <p>{language === 'ar' ? 'لا توجد بيانات فصلية متاحة' : 'No semester data available'}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {semesters.map((semester, index) => {
            const trend = getTrend(index);
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      {semester.semester} {semester.year}
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      {trend === 'up' && (
                        <Badge className="bg-success text-success-foreground">
                          <TrendingUp className="h-3 w-3 me-1" />
                          {language === 'ar' ? 'تحسن' : 'Improved'}
                        </Badge>
                      )}
                      {trend === 'down' && (
                        <Badge className="bg-warning text-warning-foreground">
                          <TrendingDown className="h-3 w-3 me-1" />
                          {language === 'ar' ? 'انخفض' : 'Declined'}
                        </Badge>
                      )}
                      {trend === 'neutral' && (
                        <Badge variant="outline">
                          <Minus className="h-3 w-3 me-1" />
                          {language === 'ar' ? 'مستقر' : 'Stable'}
                        </Badge>
                      )}
                      <div className="text-3xl font-bold text-primary">
                        {semester.semesterGPA.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'ar' ? 'إجمالي الساعات' : 'Total Credits'}
                      </div>
                      <div className="text-2xl font-semibold">{semester.totalCredits}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'ar' ? 'الساعات المجتازة' : 'Earned Credits'}
                      </div>
                      <div className="text-2xl font-semibold">{semester.earnedCredits}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium mb-2">
                      {language === 'ar' ? 'المقررات' : 'Courses'}
                    </div>
                    {semester.courses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-border"
                      >
                        <div className="flex-1">
                          <div className="font-medium">{course.courseCode}</div>
                          <div className="text-sm text-muted-foreground">{course.courseName}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            className={
                              course.grade === 'A' || course.grade === 'A-'
                                ? 'bg-success text-success-foreground'
                                : course.grade === 'F'
                                ? 'bg-destructive text-destructive-foreground'
                                : 'bg-info text-info-foreground'
                            }
                          >
                            {course.grade}
                          </Badge>
                          <div className="text-sm font-medium w-12 text-end">
                            {course.creditHours} {language === 'ar' ? 'ساعة' : 'hrs'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
