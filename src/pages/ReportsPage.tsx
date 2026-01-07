import { Award, Clock, Download, FileText, TrendingDown, TrendingUp, FileSpreadsheet, BookOpen } from 'lucide-react';
import PageMeta from '@/components/common/PageMeta';
import { useEffect, useState } from 'react';
import { TabLayout } from '@/components/common/TabLayout';
import { Logo } from '@/components/common/Logo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { GPAEngine } from '@/lib/gpa-engine';
import { courseStorage } from '@/lib/storage';
import { generateExcelReport } from '@/lib/excel-export';
import { AcademicAnalyzer, AcademicAnalysis } from '@/lib/academic-analyzer';
import { AcademicAssistant } from '@/lib/academic-assistant';
import type { Course, CourseImpact } from '@/types/types';
import TimelinePage from './TimelinePage';
import { useToast } from '@/hooks/use-toast';

export default function ReportsPage() {
  const { language } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      try {
        const coursesData = courseStorage.getAll();
        setCourses(coursesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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
      <PageMeta 
        title={language === 'ar' ? 'التقارير والتحليلات | المساعد الأكاديمي' : 'Reports & Analytics | Academic Assistant'}
        description={language === 'ar' ? 'تقارير مفصلة عن أدائك الأكاديمي وتحليلات متقدمة.' : 'Detailed reports on your academic performance and advanced analytics.'}
      />
      <div className="print:hidden">
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
                return <ReportTab courses={courses} loading={loading} />;
              case 'timeline':
                return <TimelinePage />;
              case 'export':
                return <ExportTab />;
              default:
                return <ReportTab courses={courses} loading={loading} />;
            }
          }}
        </TabLayout>
      </div>
      
      {/* Printable View - Visible only when printing */}
      <div className="hidden print:block">
        <PrintableReport courses={courses} />
      </div>
    </div>
  );
}

function ReportTab({ courses, loading }: { courses: Course[]; loading: boolean }) {
  const { language } = useLanguage();
  const [impacts, setImpacts] = useState<CourseImpact[]>([]);
  const [cumulativeGPA, setCumulativeGPA] = useState(0);

  useEffect(() => {
    if (courses.length > 0) {
      const calculation = GPAEngine.calculateGPA(courses);
      setCumulativeGPA(calculation.cumulativeGPA);
      const courseImpacts = GPAEngine.calculateCourseImpact(courses);
      setImpacts(courseImpacts);
    }
  }, [courses]);

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
      <ReportSummary 
         cumulativeGPA={cumulativeGPA} 
         courses={courses} 
         language={language} 
      />

      {/* Top Performers */}
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
                <ImpactRow key={impact.course.id} impact={impact} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Needs Improvement */}
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
                 <ImpactRow key={impact.course.id} impact={impact} isNegative />
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

      {/* Grade Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ar' ? 'توزيع التقديرات' : 'Grade Distribution'}</CardTitle>
        </CardHeader>
        <CardContent>
           <GradeDistribution courses={courses} />
        </CardContent>
      </Card>
    </div>
  );
}

function ReportSummary({ cumulativeGPA, courses, language }: { cumulativeGPA: number, courses: Course[], language: string }) {
  return (
      <Card className="print:shadow-none print:border-none">
        <CardHeader className="print:px-0">
          <CardTitle>{language === 'ar' ? 'الملخص الأكاديمي' : 'Academic Summary'}</CardTitle>
        </CardHeader>
        <CardContent className="print:px-0">
          <div className="grid gap-4 md:grid-cols-4 grid-cols-2">
            <SummaryItem 
               label={language === 'ar' ? 'المعدل التراكمي' : 'Cumulative GPA'}
               value={cumulativeGPA.toFixed(2)}
               highlight
            />
            <SummaryItem 
               label={language === 'ar' ? 'إجمالي المقررات' : 'Total Courses'}
               value={courses.length}
            />
            <SummaryItem 
               label={language === 'ar' ? 'إجمالي الساعات' : 'Total Credits'}
               value={courses.reduce((sum, c) => sum + c.creditHours, 0)}
            />
            <SummaryItem 
               label={language === 'ar' ? 'متوسط التقدير' : 'Average Grade'}
               value={(courses.reduce((sum, c) => sum + c.gradePoints, 0) / (courses.length || 1)).toFixed(2)}
            />
          </div>
        </CardContent>
      </Card>
  )
}

function SummaryItem({ label, value, highlight }: { label: string, value: string | number, highlight?: boolean }) {
  return (
    <div>
      <div className="text-sm text-muted-foreground mb-1">{label}</div>
      <div className={`text-3xl font-bold ${highlight ? 'text-primary' : ''}`}>{value}</div>
    </div>
  )
}

function ImpactRow({ impact, isNegative }: { impact: CourseImpact, isNegative?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border print:border-none print:p-0 print:mb-2">
      <div className="flex-1">
        <div className="font-medium">{impact.course.courseCode}</div>
        <div className="text-sm text-muted-foreground">{impact.course.courseName}</div>
      </div>
      <div className="flex items-center gap-3">
        <Badge className={`${isNegative ? 'bg-orange-600' : 'bg-green-600'} text-white`}>{impact.course.grade}</Badge>
        <div className={`flex items-center gap-1 ${isNegative ? 'text-red-600' : 'text-green-600'}`}>
          {isNegative ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
          <span className="font-medium">{isNegative ? '' : '+'}{impact.impact.toFixed(3)}</span>
        </div>
      </div>
    </div>
  )
}

function GradeDistribution({ courses }: { courses: Course[] }) {
    const gradeSymbols = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'] as const;
    const counts = gradeSymbols.map((g) => ({
      symbol: g,
      count: courses.filter((c) => c.grade === g).length,
    }));
    const total = counts.reduce((s, x) => s + x.count, 0);

    if (total === 0) {
      return (
        <div className="py-8 text-center text-sm text-muted-foreground italic">
          لا توجد بيانات كافية لعرض توزيع الدرجات
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {counts
          .filter((x) => x.count > 0)
          .map(({ symbol, count }) => {
            const percentage = courses.length > 0 ? (count / courses.length) * 100 : 0;
            return (
              <div key={symbol} className="flex items-center gap-4">
                <div className="w-12 font-medium">{symbol}</div>
                <div className="flex-1">
                  <div className="h-8 bg-secondary rounded-full overflow-hidden print:border print:bg-white">
                    <div
                      className="h-full bg-primary transition-all print:bg-black"
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
    );
}

function ExportTab() {
  const { language } = useLanguage();
  const { toast } = useToast();

  const handleExportExcel = async () => {
    const courses = courseStorage.getAll();
    if (courses.length === 0) {
      toast({
        title: language === 'ar' ? 'لا توجد بيانات' : 'No data',
        description: language === 'ar' ? 'لا توجد مقررات للتصدير' : 'No courses to export',
        variant: 'destructive',
      });
      return;
    }

    try {
        const buffer = await generateExcelReport(courses, language);
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `EchoPi_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
            title: language === 'ar' ? 'تم التصدير بنجاح' : 'Export Successful',
            description: language === 'ar' ? 'تم تحميل ملف Excel' : 'Excel file has been downloaded',
        });
    } catch (error) {
        console.error('Export failed:', error);
        toast({
            title: language === 'ar' ? 'فشل التصدير' : 'Export Failed',
            description: language === 'ar' ? 'حدث خطأ أثناء إنشاء الملف' : 'Error generating file',
            variant: 'destructive',
        });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ar' ? 'تصدير التقارير' : 'Export Reports'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-primary/5">
            <div>
              <h4 className="font-semibold mb-1 flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-primary" />
                {language === 'ar' ? 'تصدير كملف Excel' : 'Export as Excel'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'ar'
                  ? 'تقرير شامل بتنسيق وألوان'
                  : 'Comprehensive report with styling'}
              </p>
            </div>
            <Button onClick={handleExportExcel}>
              <Download className="h-4 w-4 me-2" />
              Excel
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div>
              <h4 className="font-semibold mb-1">
                {language === 'ar' ? 'تصدير كملف PDF' : 'Export as PDF'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'ar'
                  ? 'حفظ التقرير كملف PDF عبر الطباعة'
                  : 'Save report as PDF via print'}
              </p>
            </div>
            <Button onClick={handlePrint}>
              <Download className="h-4 w-4 me-2" />
              {language === 'ar' ? 'طباعة / PDF' : 'Print / PDF'}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-muted/50 border-dashed">
        <CardContent className="p-4">
             <div className="flex gap-2">
                 <div className="shrink-0">💡</div>
                 <p className="text-sm text-muted-foreground">
                     {language === 'ar' 
                        ? 'لتصدير PDF، اضغط على زر "طباعة / PDF" ثم اختر "Save as PDF" من خيارات الطابعة.'
                        : 'To export PDF, click "Print / PDF" then select "Save as PDF" from printer options.'}
                 </p>
             </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* Print Header Component - Content for the repeated header */
function PrintHeaderContent() {
    const { language } = useLanguage();
    return (
        <div className="w-full h-full flex flex-col justify-end pb-4 border-b-2 border-primary/10">
             <div className="flex justify-between items-end">
                {/* Brand Section */}
                <div className="flex items-center gap-4">
                    <div className="opacity-100">
                        <Logo collapsed={true} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-2xl font-black text-primary tracking-tight" style={{ lineHeight: '1' }}>Echo-π</h2>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
                            {language === 'ar' ? 'منصة التميز الأكاديمي' : 'Academic Platform'}
                        </span>
                    </div>
                </div>

                {/* Report Info Section */}
                <div className="text-end">
                    <h1 className="text-xl font-bold text-slate-800 mb-1">
                        {language === 'ar' ? 'تقرير الأداء الأكاديمي' : 'Academic Performance Report'}
                    </h1>
                    <div className="flex items-center justify-end gap-3 text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                        <span>{new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        <span className="w-px h-3 bg-slate-300"></span>
                        <span className="font-mono">REF: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                    </div>
                </div>
             </div>
        </div>
    );
}

/* Print Footer Component - Content for the repeated footer */
function PrintFooterContent() {
    const { language } = useLanguage();
    return (
        <div className="w-full h-full flex flex-col justify-end">
            <div className="w-full h-px bg-slate-200 mb-3" />
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                <div className="flex gap-4">
                    <span>
                        {language === 'ar' ? 'منصة Echo-π الأكاديمية' : 'Echo-π Academic Platform'}
                    </span>
                    <span>•</span>
                    <span>www.echo-pi.com</span>
                </div>
                <div>
                    {language === 'ar' ? 'تم إنشاء التقرير آلياً' : 'Generated System Report'}
                </div>
            </div>
        </div>
    );
}

function PrintableReport({ courses }: { courses: Course[] }) {
    const { language } = useLanguage();
    const [analysis, setAnalysis] = useState<AcademicAnalysis | null>(null);
    const [calculation, setCalculation] = useState<any>(null);
    const [impacts, setImpacts] = useState<CourseImpact[]>([]);

    useEffect(() => {
        if (courses.length > 0) {
            const calc = GPAEngine.calculateGPA(courses);
            setCalculation(calc);
            setAnalysis(AcademicAnalyzer.analyze(courses, calc));
            setImpacts(GPAEngine.calculateCourseImpact(courses));
        }
    }, [courses]);

    if (!analysis || !calculation) return null;

    const isAr = language === 'ar';

    const strictSection = AcademicAssistant.getStrictWhitelistSection(analysis, calculation, courses, isAr);
    const guide = AcademicAssistant.buildGuideSections(analysis, calculation, courses, isAr);
    const improve = AcademicAssistant.buildImprovementNotes(analysis, calculation, courses, isAr);

    const t = {
        standing: (s: string) => {
            if (!isAr) return s;
            const map: Record<string, string> = { 'Good Standing': 'وضع أكاديمي جيد', 'Probation': 'تحت الملاحظة', 'Honors': 'مرتبة الشرف', 'At Risk': 'في خطر', 'Warning': 'إنذار أكاديمي' };
            return map[s] || s;
        },
        trend: (s: string) => {
            if (!isAr) return s === 'improving' ? 'Improving ↗' : s === 'declining' ? 'Declining ↘' : 'Stable →';
            const map: Record<string, string> = { 'improving': 'في تحسن ↗', 'declining': 'في تراجع ↘', 'stable': 'مستقر →' };
            return map[s] || s;
        },
        risk: (s: string) => {
            if (!isAr) return s.toUpperCase();
            const map: Record<string, string> = { 'critical': 'حرج', 'high': 'مرتفع', 'medium': 'متوسط', 'low': 'منخفض' };
            return map[s] || s;
        },
        style: (s: string) => {
            if (!isAr) return s;
            if (s.includes('Practical')) return 'متعلم عملي/تطبيقي';
            if (s.includes('Theoretical')) return 'متعلم نظري/أكاديمي';
            return 'متعلم متوازن';
        },
        factor: (s: string) => {
            if (!isAr) return s;
            if (s.includes('Declining')) return 'تراجع في اتجاه الأداء العام';
            if (s.includes('Failed')) return 'وجود مواد رسوب أو تقديرات منخفضة';
            if (s.includes('Load')) return 'عبء دراسي غير متوازن';
            return s; // Fallback
        }
    };

    const topPerformers = impacts.filter((i) => i.impactType === 'positive').slice(0, 3);
    const gradeDist = courses.reduce((acc, c) => {
        const key = c.grade.charAt(0);
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Helper Components
    const SectionHeader = ({ title }: { title: string }) => (
        <div className="flex items-center gap-2 border-b-2 border-slate-100 pb-2 mb-4 mt-8 break-inside-avoid first:mt-0">
            <div className="h-6 w-1 bg-primary rounded-full"></div>
            <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        </div>
    );

    const ReferenceSection = ({ title, lines }: { title: string, lines: string[] }) => (
        <div className="mt-6 mb-6 p-5 bg-slate-50 border-r-4 border-slate-300 rounded-l-lg break-inside-avoid">
             <h4 className="text-base font-bold text-slate-700 mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-slate-500" />
                {title}
            </h4>
            <div className="text-sm text-slate-600 leading-relaxed text-justify space-y-2">
                {lines.length > 0 ? lines.map((line, i) => (
                    <div key={i} className="flex gap-2">
                        <span className="font-mono text-slate-400 font-bold select-none">•</span>
                        <span>{line}</span>
                    </div>
                )) : <div className="italic text-slate-400">لا توجد ملاحظات متاحة لهذا القسم حالياً.</div>}
            </div>
        </div>
    );

    return (
        <div className={`bg-white text-slate-900 max-w-[210mm] mx-auto print:max-w-none font-sans text-sm text-justify ${isAr ? 'rtl' : 'ltr'}`} dir={isAr ? 'rtl' : 'ltr'}>
             <table className="w-full">
                <thead className="print-header-group">
                    <tr><td><div className="h-[25mm] relative"><PrintHeaderContent /></div></td></tr>
                </thead>
                <tfoot className="print-footer-group">
                    <tr>
                        <td>
                            <div className="h-[20mm] relative">
                                <div className="absolute bottom-4 w-full text-center text-[10px] text-slate-400 border-t border-slate-100 pt-2">
                                    {isAr ? 
                                        "إخلاء مسؤولية: هذا التقرير أداة مساعدة للفهم والتخطيط ولا يعتبر وثيقة رسمية. يرجى مراجعة المرشد الأكاديمي للقرارات الرسمية." : 
                                        "Disclaimer: This report is a planning tool and not an official document. Please consult your academic advisor for official decisions."}
                                </div>
                                <PrintFooterContent />
                            </div>
                        </td>
                    </tr>
                </tfoot>
                <tbody>
                    <tr>
                        <td className="align-top">
                            <div className="py-4">
                                {/* 1. Overview (Original) */}
                                <SectionHeader title={isAr ? "1. نظرة عامة شاملة" : "1. Academic Overview"} />
                                <div className="grid grid-cols-4 gap-4 mb-4">
                                     <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center">
                                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">{isAr ? "المعدل التراكمي" : "Cumulative GPA"}</div>
                                        <div className="text-3xl font-black text-primary">{calculation.cumulativeGPA.toFixed(2)}</div>
                                        <div className="text-xs font-medium text-slate-600 mt-1 px-2 py-0.5 bg-white rounded border border-slate-100 inline-block">
                                            {t.standing(analysis.overview.standing)}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center">
                                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">{isAr ? "الساعات المكتسبة" : "Earned Hours"}</div>
                                        <div className="text-3xl font-black text-slate-700">{calculation.totalPassedHours}</div>
                                        <div className="text-xs text-slate-400 mt-1">{isAr ? "ساعة معتمدة" : "Credit Hours"}</div>
                                    </div>
                                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center">
                                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">{isAr ? "كفاءة الإنجاز" : "Completion Rate"}</div>
                                        <div className="text-3xl font-black text-slate-700">{Math.round((calculation.totalPassedHours / (calculation.totalRegisteredHours || 1)) * 100)}%</div>
                                        <div className="text-xs text-slate-400 mt-1">{isAr ? "من المسجل" : "of Attempted"}</div>
                                    </div>
                                     <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center">
                                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">{isAr ? "عدد المقررات" : "Total Courses"}</div>
                                        <div className="text-3xl font-black text-slate-700">{courses.length}</div>
                                        <div className="text-xs text-slate-400 mt-1">{isAr ? "مقرر دراسي" : "Courses"}</div>
                                    </div>
                                </div>
                                {isAr && improve && improve.overview.length > 0 && (
                                    <div className="text-xs text-slate-600 mt-2">
                                        <div className="font-bold mb-1">كيف تقرأ هذا القسم</div>
                                        <div className="space-y-1">
                                            {improve.overview.map((l, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <span className="font-mono text-slate-400 font-bold select-none">•</span>
                                                    <span>{l}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 2. Statistical Insights (Original) */}
                                <SectionHeader title={isAr ? "2. المؤشرات الإحصائية" : "2. Statistical Indicators"} />
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                     <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-sm font-bold text-slate-600">{isAr ? "مستوى المخاطرة المحتمل" : "Risk Level"}</span>
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                analysis.risk.level === 'critical' ? 'bg-red-100 text-red-700' :
                                                analysis.risk.level === 'high' ? 'bg-orange-100 text-orange-700' :
                                                analysis.risk.level === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                                {t.risk(analysis.risk.level)}
                                            </span>
                                        </div>
                                        <div className="text-xs text-slate-500 leading-relaxed">
                                            {isAr ? "يعتمد هذا المؤشر على تحليل المعدل التراكمي واتجاه الأداء العام." : "Based on GPA trends and overall performance analysis."}
                                        </div>
                                    </div>
                                    <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-sm font-bold text-slate-600">{isAr ? "عامل التأثير الرئيسي" : "Primary Factor"}</span>
                                        </div>
                                        <div className="text-sm font-medium text-slate-800">
                                            {isAr && analysis.risk.factors[0] ? 
                                                (analysis.risk.factors[0].includes('Declining') ? 'تراجع في الأداء' : 
                                                 analysis.risk.factors[0].includes('Failed') ? 'مواد متعثرة' : analysis.risk.factors[0]) 
                                                : (analysis.risk.factors[0] || (isAr ? "لا توجد عوامل سلبية" : "No negative factors"))}
                                        </div>
                                    </div>
                                </div>
                                {isAr && improve && improve.statistical.length > 0 && (
                                    <div className="text-xs text-slate-600 mt-2">
                                        <div className="font-bold mb-1">ماذا يشير هذا النمط</div>
                                        <div className="space-y-1">
                                            {improve.statistical.map((l, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <span className="font-mono text-slate-400 font-bold select-none">•</span>
                                                    <span>{l}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 3. Strategy & Distribution (Original) */}
                                <SectionHeader title={isAr ? "3. التوزيع والتحليل الاستراتيجي" : "3. Strategy & Distribution"} />
                                <div className="grid grid-cols-3 gap-6 mb-4">
                                    <div className="col-span-2 p-5 bg-white border border-slate-200 rounded-lg">
                                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">{isAr ? "توزيع الدرجات" : "Grade Distribution"}</h4>
                                        <div className="print:border-0">
                                            <GradeDistribution courses={courses} />
                                        </div>
                                    </div>
                                    <div className="p-5 bg-white border border-slate-200 rounded-lg">
                                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">{isAr ? "الأداء المتميز" : "Top Performance"}</h4>
                                        <div className="space-y-3">
                                            {topPerformers.length > 0 ? topPerformers.map((c, i) => (
                                                <div key={i} className="flex justify-between items-center pb-2 border-b border-slate-50 last:border-0">
                                                    <div className="truncate pr-2">
                                                        <div className="font-bold text-slate-700 text-sm truncate">{c.course.courseName}</div>
                                                        <div className="text-[10px] text-slate-400">{c.course.courseCode}</div>
                                                    </div>
                                                    <div className="text-primary font-black text-sm">{c.course.grade}</div>
                                                </div>
                                            )) : <div className="text-sm text-slate-400 italic py-2 text-center">{isAr ? "لا توجد بيانات كافية" : "No data available"}</div>}
                                        </div>
                                    </div>
                                </div>
                                {isAr && improve && (
                                    <div className="text-xs text-slate-600 mt-2">
                                        <div className="font-bold mb-1">قراءة هذا القسم</div>
                                        <div className="space-y-1">
                                            {improve.distribution.map((l, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <span className="font-mono text-slate-400 font-bold select-none">•</span>
                                                    <span>{l}</span>
                                                </div>
                                            ))}
                                            {improve.grouping.map((l, i) => (
                                                <div key={`g-${i}`} className="flex gap-2">
                                                    <span className="font-mono text-slate-400 font-bold select-none">•</span>
                                                    <span>{l}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 4. Semester Record (Original) */}
                                <SectionHeader title={isAr ? "4. السجل الأكاديمي الفصلي" : "4. Semester-wise Academic Record"} />
                                <div className="space-y-4">
                                    {analysis.semesters.map((sem, idx) => (
                                        <div key={idx} className="break-inside-avoid border border-slate-200 rounded-lg overflow-hidden shadow-sm print:shadow-none">
                                            <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 flex justify-between items-center">
                                                <h4 className="font-bold text-slate-800 text-sm">
                                                    {sem.semester} {sem.year}
                                                </h4>
                                                <div className="text-xs font-mono text-slate-600">
                                                    <span className="mr-3">{isAr ? "الفصلي" : "Sem"}: <span className="font-bold text-primary">{sem.semesterGPA.toFixed(2)}</span></span>
                                                    <span>{isAr ? "التراكمي" : "Cum"}: <span className="font-bold text-slate-800">{sem.cumulativeGPA.toFixed(2)}</span></span>
                                                </div>
                                            </div>
                                            <table className="w-full text-xs">
                                                <thead className="bg-white text-slate-500 border-b border-slate-100">
                                                    <tr>
                                                        <th className="p-2 text-start font-medium w-1/3">{isAr ? "المقرر" : "Course"}</th>
                                                        <th className="p-2 text-center font-medium w-12">{isAr ? "س" : "Cr"}</th>
                                                        <th className="p-2 text-center font-medium w-12">{isAr ? "ت" : "Gr"}</th>
                                                        <th className="p-2 text-center font-medium w-12">{isAr ? "ن" : "Pts"}</th>
                                                        <th className="p-2 text-start font-medium">{isAr ? "ملاحظات" : "Notes"}</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-50">
                                                    {sem.courses.map(course => (
                                                        <tr key={course.id}>
                                                            <td className="p-2 font-medium text-slate-700">
                                                                {course.courseName} <span className="text-slate-400 font-normal mx-1 text-[10px]">({course.courseCode})</span>
                                                            </td>
                                                            <td className="p-2 text-center text-slate-600">{course.creditHours}</td>
                                                            <td className="p-2 text-center">
                                                                <span className={`font-bold ${
                                                                    ['A', 'A-'].includes(course.grade) ? 'text-green-600' :
                                                                    ['F', 'D'].includes(course.grade) ? 'text-red-600' : 'text-slate-700'
                                                                }`}>{course.grade}</span>
                                                            </td>
                                                            <td className="p-2 text-center text-slate-600">{course.gradePoints}</td>
                                                            <td className="p-2 text-slate-500 italic text-[10px]">
                                                                {course.gradePoints >= 3.5 ? (isAr ? 'أداء متميز' : 'Excellent') : 
                                                                 course.gradePoints < 2.0 ? (isAr ? 'مراجعة مطلوبة' : 'Review Needed') : '-'}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* 5. ربط المقررات بطريقة الفهم الدراسي */}
                                {isAr && guide && (
                                    <>
                                        <SectionHeader title="5. ربط المقررات بطريقة الفهم الدراسي" />
                                        <div className="text-xs text-slate-700 space-y-1">
                                            {guide.s5.map((x: {ref: string, text: string}, i: number) => (
                                                <div key={i} className="flex gap-2">
                                                    <span className="font-mono text-slate-400 font-bold select-none">•</span>
                                                    <span>{`[${x.ref}] → ${x.text}`}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                
                                {/* 6. كيف يستخدم الطالب هذا التقرير عمليًا */}
                                {isAr && guide && (
                                    <>
                                        <SectionHeader title="6. كيف يستخدم الطالب هذا التقرير عمليًا" />
                                        <div className="text-xs text-slate-700 space-y-1">
                                            {guide.s6.map((x: {ref: string, text: string}, i: number) => (
                                                <div key={i} className="flex gap-2">
                                                    <span className="font-mono text-slate-400 font-bold select-none">•</span>
                                                    <span>{`[${x.ref}] → ${x.text}`}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                
                                {/* 7. نطاق التقرير (ثابت) */}
                                {isAr && guide && (
                                    <>
                                        <SectionHeader title="7. نطاق التقرير (ثابت)" />
                                        <div className="text-xs text-slate-700 space-y-1">
                                            {guide.s7.map((x: {text: string}, i: number) => (
                                                <div key={i} className="flex gap-2">
                                                    <span className="font-mono text-slate-400 font-bold select-none">•</span>
                                                    <span>{x.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                
                                {/* 8. إرشادات تنظيم الدراسة والتحسين (مبنية على البيانات) */}
                                {isAr && (
                                    <>
                                        <SectionHeader title="8. إرشادات تنظيم الدراسة والتحسين" />
                                        <div className="text-xs text-slate-700 space-y-1">
                                            {AcademicAssistant.buildStudyStrategy(analysis, calculation, courses, isAr).map((l, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <span className="font-mono text-slate-400 font-bold select-none">•</span>
                                                    <span>{l}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                
                                {/* 9. خطة مذاكرة مخصصة (مساعدة ذكية) */}
                                {isAr && (
                                    <>
                                        <SectionHeader title="9. خطة مذاكرة مخصصة (مساعدة ذكية)" />
                                        <div className="text-xs text-slate-700 space-y-1">
                                            {AcademicAssistant.buildAIAssistedPlan(analysis, calculation, courses, isAr).map((l, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <span className="font-mono text-slate-400 font-bold select-none">•</span>
                                                    <span>{l}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                {isAr && improve && improve.semesterComparisons.length > 0 && (
                                    <div className="text-xs text-slate-600 mt-2">
                                        <div className="font-bold mb-1">ماذا تُظهر المقارنات بين الفصول</div>
                                        <div className="space-y-1">
                                            {improve.semesterComparisons.map((l, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <span className="font-mono text-slate-400 font-bold select-none">•</span>
                                                    <span>{l}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {isAr && guide && (
                                    <>
                                        <div className="mt-8 border-t-4 border-slate-800 pt-4 break-before-page">
                                            <h2 className="text-2xl font-black text-slate-900 mb-6 text-center">ملحق توضيحي مستند إلى مراجع مباشرة</h2>
                                        </div>
                                        <ReferenceSection title="القسم 1: النظرة العامة الشاملة (كما وردت)" lines={guide.s1.map(x => `[${x.ref}] → ${x.text}`)} />
                                        <ReferenceSection title="القسم 2: المؤشرات الإحصائية (كما وردت)" lines={guide.s2.map(x => `[${x.ref}] → ${x.text}`)} />
                                        <ReferenceSection title="القسم 3: التوزيع والتحليل الاستراتيجي (كما ورد)" lines={guide.s3.map(x => `[${x.ref}] → ${x.text}`)} />
                                        <div className="mt-6 mb-6 p-5 bg-slate-50 border-r-4 border-slate-300 rounded-l-lg break-inside-avoid">
                                            <h4 className="text-base font-bold text-slate-700 mb-3 flex items-center gap-2">
                                                <BookOpen size={16} className="text-slate-500" />
                                                القسم 4: السجل الأكاديمي الفصلي (قراءة وصفية)
                                            </h4>
                                            <div className="space-y-4">
                                                {guide.s4.map((items: Array<{ref: string, text: string}>, i: number) => (
                                                    <div key={i} className="border border-slate-200 rounded-lg p-4 bg-white">
                                                        <div className="space-y-2 text-sm text-slate-700">
                                                            {items.map((it, j) => (
                                                                <div key={j} className="flex gap-2">
                                                                    <span className="font-mono text-slate-400 font-bold select-none">•</span>
                                                                    <span>{`[${it.ref}] → ${it.text}`}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <ReferenceSection title="القسم 5: ربط المقررات بطريقة الفهم الدراسي" lines={guide.s5.map(x => `[${x.ref}] → ${x.text}`)} />
                                        <ReferenceSection title="القسم 6: كيف يستخدم الطالب هذا التقرير عمليًا" lines={guide.s6.map(x => `[${x.ref}] → ${x.text}`)} />
                                        <div className="mt-6 mb-6 p-5 bg-slate-50 border-r-4 border-slate-300 rounded-l-lg break-inside-avoid">
                                            <h4 className="text-base font-bold text-slate-700 mb-3 flex items-center gap-2">
                                                <BookOpen size={16} className="text-slate-500" />
                                                القسم 7: نطاق التقرير (ثابت)
                                            </h4>
                                            <div className="text-sm text-slate-600 leading-relaxed text-justify space-y-2">
                                                {guide.s7.map((x, i) => (
                                                    <div key={i} className="flex gap-2">
                                                        <span className="font-mono text-slate-400 font-bold select-none">•</span>
                                                        <span>{x.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
