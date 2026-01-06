import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TabLayout } from '@/components/common/TabLayout';
import { FileText, Clock, Download, TrendingUp, TrendingDown, Award } from 'lucide-react';
import TimelinePage from './TimelinePage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { courseStorage } from '@/lib/storage';
import { GPAEngine } from '@/lib/gpa-engine';
import type { Course, CourseImpact } from '@/types/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReportsPage() {
  const { language } = useLanguage();

  const tabs = [
    {
      id: 'report',
      label: language === 'ar' ? 'تقرير المعدل' : 'GPA Report',
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: 'timeline',
      label: language === 'ar' ? 'الجدول الزمني' : 'Timeline',
      icon: <Clock className="h-4 w-4" />,
    },
    {
      id: 'export',
      label: language === 'ar' ? 'التصدير' : 'Export',
      icon: <Download className="h-4 w-4" />,
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {language === 'ar' ? 'التقارير والتحليلات' : 'Reports & Analytics'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {language === 'ar'
            ? 'عرض تقاريرك الأكاديمية وتصديرها'
            : 'View and export your academic reports'}
        </p>
      </div>

      <TabLayout tabs={tabs} defaultTab="report">
        {(activeTab) => {
          switch (activeTab) {
            case 'report':
              return <ReportTab />;
            case 'timeline':
              return <TimelinePage />;
            case 'export':
              return <ExportTab />;
            default:
              return <ReportTab />;
          }
        }}
      </TabLayout>
    </div>
  );
}

function ReportTab() {
  const { language } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [impacts, setImpacts] = useState<CourseImpact[]>([]);
  const [loading, setLoading] = useState(true);
  const [cumulativeGPA, setCumulativeGPA] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const coursesData = courseStorage.getAll();
      setCourses(coursesData);

      if (coursesData.length > 0) {
        const calculation = GPAEngine.calculateGPA(coursesData);
        setCumulativeGPA(calculation.cumulativeGPA);

        const courseImpacts = GPAEngine.calculateCourseImpact(coursesData);
        setImpacts(courseImpacts);
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
        <Skeleton className="h-32 bg-muted" />
        <Skeleton className="h-64 bg-muted" />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <Card className="border-2 border-dashed">
        <CardContent className="py-16 text-center">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">
            {language === 'ar' ? 'لا توجد بيانات' : 'No Data Available'}
          </h3>
          <p className="text-muted-foreground">
            {language === 'ar'
              ? 'أضف مقررات لعرض التقرير الأكاديمي'
              : 'Add courses to view academic report'}
          </p>
        </CardContent>
      </Card>
    );
  }

  const topPerformers = impacts.filter((i) => i.impactType === 'positive').slice(0, 5);
  const needsImprovement = impacts.filter((i) => i.impactType === 'negative').slice(0, 5);

  return (
    <div className="space-y-6">
      {/* ملخص أكاديمي */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ar' ? 'الملخص الأكاديمي' : 'Academic Summary'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                {language === 'ar' ? 'المعدل التراكمي' : 'Cumulative GPA'}
              </div>
              <div className="text-3xl font-bold text-primary">{cumulativeGPA.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                {language === 'ar' ? 'إجمالي المقررات' : 'Total Courses'}
              </div>
              <div className="text-3xl font-bold">{courses.length}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                {language === 'ar' ? 'إجمالي الساعات' : 'Total Credits'}
              </div>
              <div className="text-3xl font-bold">
                {courses.reduce((sum, c) => sum + c.creditHours, 0)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                {language === 'ar' ? 'متوسط التقدير' : 'Average Grade'}
              </div>
              <div className="text-3xl font-bold">
                {(courses.reduce((sum, c) => sum + c.gradePoints, 0) / courses.length).toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* أفضل المقررات */}
      {topPerformers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-600" />
              {language === 'ar' ? 'أفضل المقررات أداءً' : 'Top Performing Courses'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((impact) => (
                <div
                  key={impact.course.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <div className="font-medium">{impact.course.courseCode}</div>
                    <div className="text-sm text-muted-foreground">{impact.course.courseName}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-600 text-white">{impact.course.grade}</Badge>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">+{impact.impact.toFixed(3)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* مقررات تحتاج تحسين */}
      {needsImprovement.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-orange-600" />
              {language === 'ar' ? 'مقررات تؤثر سلباً على المعدل' : 'Courses Impacting GPA Negatively'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {needsImprovement.map((impact) => (
                <div
                  key={impact.course.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <div className="font-medium">{impact.course.courseCode}</div>
                    <div className="text-sm text-muted-foreground">{impact.course.courseName}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-orange-600 text-white">{impact.course.grade}</Badge>
                    <div className="flex items-center gap-1 text-red-600">
                      <TrendingDown className="h-4 w-4" />
                      <span className="font-medium">{impact.impact.toFixed(3)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡{' '}
                {language === 'ar'
                  ? 'فكّر في إعادة هذه المقررات لتحسين معدلك'
                  : 'Consider retaking these courses to improve your GPA'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* توزيع التقديرات */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ar' ? 'توزيع التقديرات' : 'Grade Distribution'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'].map((grade) => {
              const count = courses.filter((c) => c.grade === grade).length;
              const percentage = courses.length > 0 ? (count / courses.length) * 100 : 0;

              if (count === 0) return null;

              return (
                <div key={grade} className="flex items-center gap-4">
                  <div className="w-12 font-medium">{grade}</div>
                  <div className="flex-1">
                    <div className="h-8 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-end">
                    <span className="font-bold">{count}</span>
                    <span className="text-sm text-muted-foreground ms-1">
                      ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ExportTab() {
  const { language } = useLanguage();

  const handleExportPDF = () => {
    alert(language === 'ar' ? 'سيتم إضافة التصدير قريباً' : 'Export coming soon');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ar' ? 'تصدير التقارير' : 'Export Reports'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div>
              <h4 className="font-semibold mb-1">
                {language === 'ar' ? 'تقرير المعدل الأكاديمي' : 'Academic GPA Report'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'ar'
                  ? 'تقرير شامل يحتوي على جميع المقررات والمعدلات'
                  : 'Comprehensive report with all courses and GPAs'}
              </p>
            </div>
            <Button onClick={handleExportPDF}>
              <Download className="h-4 w-4 me-2" />
              {language === 'ar' ? 'تصدير PDF' : 'Export PDF'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div>
              <h4 className="font-semibold mb-1">
                {language === 'ar' ? 'الجدول الزمني الأكاديمي' : 'Academic Timeline'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'ar'
                  ? 'تقرير يوضح تطور المعدل عبر الفصول الدراسية'
                  : 'Report showing GPA evolution across semesters'}
              </p>
            </div>
            <Button onClick={handleExportPDF} variant="outline">
              <Download className="h-4 w-4 me-2" />
              {language === 'ar' ? 'تصدير PDF' : 'Export PDF'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
