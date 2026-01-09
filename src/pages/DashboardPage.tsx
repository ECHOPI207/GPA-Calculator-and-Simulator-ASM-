import { Brain, GraduationCap, Plus, TrendingUp, BookOpen, Calculator, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import { GPACard, StatCard } from '@/components/gpa/GPACard';
import PageMeta from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { GPAEngine } from '@/lib/gpa-engine';
import { courseStorage } from '@/lib/storage';
import type { Course, GPACalculation } from '@/types/types';

export default function DashboardPage() {
  const { t, language } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [gpaCalc, setGpaCalc] = useState<GPACalculation | null>(null);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [gradeData, setGradeData] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allCourses = courseStorage.getAll();
    setCourses(allCourses);

    if (allCourses.length > 0) {
      const calculation = GPAEngine.calculateGPA(allCourses);
      setGpaCalc(calculation);

      // Prepare Trend Data
      const trend = calculation.semesters.map(sem => ({
        name: `${sem.semester} ${sem.year}`,
        gpa: sem.semesterGPA,
        cumulative: sem.cumulativeGPA,
        credits: sem.totalCredits
      }));
      setTrendData(trend);

      // Prepare Grade Distribution
      const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'];
      const distribution = grades.map(grade => ({
        name: grade,
        count: allCourses.filter(c => c.grade === grade).length
      })).filter(d => d.count > 0);
      setGradeData(distribution);
    }
  };

  if (courses.length === 0) {
    return (
      <div className="space-y-6">
        <PageMeta
          title={language === 'ar' ? 'لوحة المعلومات | المساعد الأكاديمي' : 'Dashboard | Academic Assistant'}
          description={language === 'ar' ? 'نظرة عامة على أدائك الأكاديمي والمعدل التراكمي.' : 'Overview of your academic performance and GPA.'}
        />
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
            <h2 className="text-2xl font-bold mb-3 text-foreground">
              {language === 'ar' ? 'لا توجد مقررات' : 'No courses added yet'}
            </h2>
            <p className="text-muted-foreground text-lg mb-6 max-w-md mx-auto">
              {language === 'ar'
                ? 'ابدأ بإضافة مقرراتك الدراسية في صفحة حاسبة المعدل لتتبع أدائك الأكاديمي'
                : 'Start by adding your courses in the Calculator page to track your academic performance'}
            </p>
            <Button asChild size="lg" className="font-semibold">
              <Link to="/gpa">
                <Plus className="h-5 w-5 me-2" />
                {language === 'ar' ? 'إضافة مقررات' : 'Add Courses'}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageMeta
        title={language === 'ar' ? 'لوحة المعلومات | المساعد الأكاديمي' : 'Dashboard | Academic Assistant'}
        description={language === 'ar' ? 'نظرة عامة على أدائك الأكاديمي والمعدل التراكمي.' : 'Overview of your academic performance and GPA.'}
      />
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground mt-2">
          {language === 'ar'
            ? 'نظرة عامة على أدائك الأكاديمي وإحصائيات متقدمة'
            : 'Overview of your academic performance and advanced statistics'}
        </p>
      </div>

      {/* Main Stats Grid */}
      {gpaCalc && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <GPACard
            title={t('gpa.cumulative')}
            gpa={gpaCalc.cumulativeGPA}
            classification={gpaCalc.classification}
            classificationNameEn={gpaCalc.classificationNameEn}
            classificationNameAr={gpaCalc.classificationNameAr}
          />
          <StatCard
            title={t('course.totalHours')}
            value={gpaCalc.totalRegisteredHours.toString()}
            icon={<BookOpen className="h-4 w-4" />}
            subtitle={language === 'ar' ? `${gpaCalc.totalPassedHours} ساعة مجتازة` : `${gpaCalc.totalPassedHours} passed hours`}
          />
          <StatCard
            title={t('course.totalCourses')}
            value={courses.length.toString()}
            icon={<Calculator className="h-4 w-4" />}
            subtitle={language === 'ar' ? 'مقرر مسجل' : 'Registered courses'}
          />
          <StatCard
            title={language === 'ar' ? 'أفضل فصل' : 'Best Semester'}
            value={Math.max(...gpaCalc.semesters.map(s => s.semesterGPA)).toFixed(2)}
            icon={<Award className="h-4 w-4" />}
            subtitle={language === 'ar' ? 'أعلى معدل فصلي' : 'Highest semester GPA'}
          />
        </div>
      )}

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* GPA Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              {language === 'ar' ? 'تطور المعدل التراكمي' : 'GPA Progression'}
            </CardTitle>
            <CardDescription>
              {language === 'ar' ? 'تتبع معدلك عبر الفصول الدراسية' : 'Track your GPA across semesters'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis domain={[0, 4]} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cumulative"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorGpa)"
                    name="GPA"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Grade Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              {language === 'ar' ? 'توزيع التقديرات' : 'Grade Distribution'}
            </CardTitle>
            <CardDescription>
              {language === 'ar' ? 'نظرة عامة على درجاتك في جميع المواد' : 'Overview of your grades across all courses'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                    {gradeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name.startsWith('A') ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
