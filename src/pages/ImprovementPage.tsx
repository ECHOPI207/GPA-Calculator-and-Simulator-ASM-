import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { courseStorage } from '@/lib/storage';
import { GPAImprovementEngine } from '@/lib/gpa-improvement-engine';
import type { ImprovementAnalysis } from '@/lib/gpa-improvement-engine';
import {
  ImprovementSummary,
  ImprovementSection,
} from '@/components/gpa/ImprovementComponents';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Target, Calendar, TrendingUp, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function ImprovementPage() {
  const { t, language } = useLanguage();
  const [analysis, setAnalysis] = useState<ImprovementAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalysis();
  }, []);

  const loadAnalysis = () => {
    setLoading(true);
    try {
      const courses = courseStorage.getAll();
      
      if (courses.length === 0) {
        setAnalysis(null);
        return;
      }

      const result = GPAImprovementEngine.analyzeImprovements(courses);
      setAnalysis(result);
    } catch (error) {
      console.error('خطأ في تحليل التحسينات:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 bg-muted animate-pulse rounded" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!analysis || analysis.summary.totalActions === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            {language === 'ar' ? 'تحليل تحسين المعدل' : 'GPA Improvement Analysis'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {language === 'ar'
              ? 'اكتشف كيف يمكنك تحسين معدلك الأكاديمي'
              : 'Discover how you can improve your academic GPA'}
          </p>
        </div>

        <Card className="border-2 border-dashed">
          <CardContent className="py-16 text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-primary/10 p-6">
                <GraduationCap className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3">
              {language === 'ar' ? 'لا توجد مقررات' : 'No courses found'}
            </h3>
            <p className="text-muted-foreground text-lg mb-6 max-w-md mx-auto">
              {language === 'ar'
                ? 'أضف مقرراتك الدراسية أولاً للحصول على تحليل شامل لتحسين معدلك'
                : 'Add your courses first to get a comprehensive GPA improvement analysis'}
            </p>
            <Button asChild size="lg">
              <Link to="/calculator">
                {language === 'ar' ? 'إضافة مقررات' : 'Add Courses'}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* العنوان */}
      <div>
        <h1 className="text-3xl font-bold">
          {language === 'ar' ? 'تحليل تحسين المعدل الذكي' : 'Intelligent GPA Improvement Analysis'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === 'ar'
            ? 'خطة مخصصة لتحسين معدلك الأكاديمي بناءً على تحليل رقمي دقيق'
            : 'Personalized plan to improve your GPA based on precise numeric analysis'}
        </p>
      </div>

      {/* الملخص */}
      <ImprovementSummary
        currentGPA={analysis.currentGPA}
        maxPossibleGPA={analysis.summary.maxPossibleGPA}
        realisticTargetGPA={analysis.summary.realisticTargetGPA}
        totalActions={analysis.summary.totalActions}
      />

      {/* نصيحة مهمة */}
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                {language === 'ar' ? 'كيف تستخدم هذا التحليل؟' : 'How to use this analysis?'}
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {language === 'ar'
                  ? 'هذا التحليل يعتمد على حسابات رقمية دقيقة. ركز على "الإنجازات السريعة" أولاً للحصول على أكبر تأثير بأقل جهد. كل توصية تعرض التحسين الدقيق المتوقع في معدلك.'
                  : 'This analysis is based on precise numeric calculations. Focus on "Quick Wins" first to get maximum impact with minimum effort. Each recommendation shows the exact expected improvement in your GPA.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* الإنجازات السريعة */}
      <ImprovementSection
        title={language === 'ar' ? '⚡ إنجازات سريعة' : '⚡ Quick Wins'}
        icon={<Zap className="h-6 w-6 text-yellow-500" />}
        actions={analysis.quickWins}
        emptyMessage={
          language === 'ar'
            ? 'لا توجد إنجازات سريعة متاحة حالياً'
            : 'No quick wins available at the moment'
        }
      />

      {/* توصيات إعادة الدراسة */}
      {analysis.retakeRecommendations.length > 0 && (
        <ImprovementSection
          title={language === 'ar' ? '🔄 توصيات إعادة الدراسة' : '🔄 Retake Recommendations'}
          icon={<TrendingUp className="h-6 w-6 text-red-500" />}
          actions={analysis.retakeRecommendations}
          emptyMessage={
            language === 'ar'
              ? 'لا توجد مقررات تحتاج إعادة دراسة'
              : 'No courses need to be retaken'
          }
        />
      )}

      {/* تحسينات متوسطة المدى */}
      <ImprovementSection
        title={language === 'ar' ? '🎯 تحسينات متوسطة المدى' : '🎯 Medium-Term Improvements'}
        icon={<Target className="h-6 w-6 text-blue-500" />}
        actions={analysis.mediumTerm}
        emptyMessage={
          language === 'ar'
            ? 'لا توجد تحسينات متوسطة المدى متاحة'
            : 'No medium-term improvements available'
        }
      />

      {/* استراتيجية طويلة المدى */}
      <ImprovementSection
        title={language === 'ar' ? '📅 استراتيجية طويلة المدى' : '📅 Long-Term Strategy'}
        icon={<Calendar className="h-6 w-6 text-green-500" />}
        actions={analysis.longTerm}
        emptyMessage={
          language === 'ar'
            ? 'لا توجد استراتيجيات طويلة المدى متاحة'
            : 'No long-term strategies available'
        }
      />

      {/* ملاحظة ختامية */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            {language === 'ar'
              ? 'هذا التحليل يعتمد على بياناتك الحالية ويقدم توقعات رقمية دقيقة. النتائج الفعلية تعتمد على جهدك والتزامك الأكاديمي.'
              : 'This analysis is based on your current data and provides accurate numeric projections. Actual results depend on your effort and academic commitment.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
