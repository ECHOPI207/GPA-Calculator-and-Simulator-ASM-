import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { GPACard, StatCard } from '@/components/gpa/GPACard';
import { courseApi } from '@/db/api';
import { GPAEngine } from '@/lib/gpa-engine';
import type { Course, GPACalculation } from '@/types/types';
import { BookOpen, GraduationCap, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [gpaCalc, setGpaCalc] = useState<GPACalculation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const coursesData = await courseApi.getCourses(user.id);
      setCourses(coursesData);
      
      if (coursesData.length > 0) {
        const calculation = GPAEngine.calculateGPA(coursesData);
        setGpaCalc(calculation);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2 bg-muted" />
          <Skeleton className="h-4 w-96 bg-muted" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (!gpaCalc || courses.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground mt-2">{t('app.tagline')}</p>
        </div>
        
        <Card>
          <CardContent className="py-12 text-center">
            <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {t('course.noCourses')}
            </h3>
            <p className="text-muted-foreground">
              Start by adding your courses in the Calculator page
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const recentCourses = [...courses]
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.semester.localeCompare(a.semester);
    })
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground mt-2">{t('app.tagline')}</p>
      </div>

      {/* GPA Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

        <StatCard
          title={t('dashboard.totalHours')}
          value={gpaCalc.totalRegisteredHours}
          icon={<BookOpen className="h-5 w-5" />}
        />

        <StatCard
          title={t('dashboard.passedHours')}
          value={gpaCalc.totalPassedHours}
          subtitle={`${((gpaCalc.totalPassedHours / gpaCalc.totalRegisteredHours) * 100).toFixed(0)}% completion`}
          icon={<Award className="h-5 w-5" />}
        />
      </div>

      {/* Recent Courses */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.recentCourses')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium">{course.courseCode}</div>
                  <div className="text-sm text-muted-foreground">{course.courseName}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-muted-foreground">
                    {course.semester} {course.year}
                  </div>
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
                    {course.creditHours} hrs
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Trend */}
      {gpaCalc.semesters.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {gpaCalc.semesters.map((semester, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium">
                    {semester.semester} {semester.year}
                  </div>
                  <div className="flex-1">
                    <div className="h-8 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(semester.semesterGPA / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-16 text-end font-bold">
                    {semester.semesterGPA.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
