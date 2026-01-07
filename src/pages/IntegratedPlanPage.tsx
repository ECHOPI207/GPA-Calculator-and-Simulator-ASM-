import { 
  AlertCircle, 
  ArrowRight, 
  Brain, 
  CheckCircle2,
  Lightbulb,
  Target,
  TrendingUp, 
  Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import type { IntegratedActionPlan, IntegratedRecommendation } from '@/lib/clp-gpa-integration';
import { CLPGPAIntegration } from '@/lib/clp-gpa-integration';
import { GPAImprovementEngine } from '@/lib/gpa-improvement-engine';
import { clpStorage, courseStorage } from '@/lib/storage';

export default function IntegratedPlanPage() {
  const { language } = useLanguage();
  const [plan, setPlan] = useState<IntegratedActionPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlan();
  }, []);

  const loadPlan = () => {
    setLoading(true);
    try {
      // التحقق من وجود ملف CLP
      const profile = clpStorage.get();
      if (!profile) {
        // بدلاً من التوجيه، نعرض حالة فارغة في الـ render
        setPlan(null);
        setLoading(false);
        return;
      }

      // الحصول على المقررات
      const courses = courseStorage.getAll();
      
      // حتى لو لم تكن هناك مقررات، يمكننا عرض نصائح عامة، لكن الخطة تحتاج بيانات
      if (courses.length === 0) {
        setPlan(null);
        setLoading(false);
        return;
      }

      // تحليل فرص التحسين
      const improvementAnalysis = GPAImprovementEngine.analyzeImprovements(courses);
      const allActions = [
        ...improvementAnalysis.quickWins,
        ...improvementAnalysis.mediumTerm,
        ...improvementAnalysis.retakeRecommendations,
      ];

      // دمج CLP مع GPA
      const integratedPlan = CLPGPAIntegration.createIntegratedPlan(allActions, profile);
      setPlan(integratedPlan);
    } catch (error) {
      console.error('خطأ في تحميل الخطة:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">
            {language === 'ar' ? 'جاري إنشاء خطتك المخصصة...' : 'Creating your personalized plan...'}
          </p>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-2 border-dashed">
          <CardContent className="py-16 text-center">
            <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">
              {language === 'ar' ? 'لا توجد بيانات كافية' : 'Insufficient Data'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {language === 'ar'
                ? 'تحتاج لإكمال التقييم المعرفي وإضافة مقررات للحصول على خطة متكاملة'
                : 'You need to complete the cognitive assessment and add courses to get an integrated plan'}
            </p>
            <div className="flex gap-3 justify-center">
              <Button asChild>
                <Link to="/clp-assessment">
                  {language === 'ar' ? 'إكمال التقييم' : 'Complete Assessment'}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/calculator">
                  {language === 'ar' ? 'إضافة مقررات' : 'Add Courses'}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const executiveSummary = CLPGPAIntegration.generateExecutiveSummary(plan, language);

  return (
    <div className="space-y-6">
      {/* العنوان */}
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-primary/10 p-3">
          <Target className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {language === 'ar' ? 'خطة العمل المتكاملة' : 'Integrated Action Plan'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'ar'
              ? 'تحسين المعدل + استراتيجيات مذاكرة مخصصة'
              : 'GPA Improvement + Personalized Study Strategies'}
          </p>
        </div>
      </div>

      {/* الملخص التنفيذي */}
      <Alert className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-background">
        <Lightbulb className="h-5 w-5 text-primary" />
        <AlertDescription className="text-sm leading-relaxed">
          {executiveSummary}
        </AlertDescription>
      </Alert>

      {/* إحصائيات سريعة */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {plan.summary.totalRecommendations}
              </div>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' ? 'توصية متاحة' : 'Available Actions'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                {plan.summary.highPriority}
              </div>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' ? 'أولوية عالية' : 'High Priority'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                +{plan.summary.expectedGPAGain.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' ? 'تحسين متوقع' : 'Expected Gain'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                {plan.summary.keyBehavioralFocus.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' ? 'مجالات تركيز' : 'Focus Areas'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التوصيات */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">
            {language === 'ar' ? 'توصيات مخصصة' : 'Personalized Recommendations'}
          </h2>
        </div>

        {plan.recommendations.map((rec: IntegratedRecommendation, index: number) => (
          <IntegratedRecommendationCard
            key={rec.improvementAction.id}
            recommendation={rec}
            index={index}
            language={language}
          />
        ))}
      </div>

      {/* ملاحظة ختامية */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            {language === 'ar'
              ? 'هذه الخطة مبنية على تحليل رقمي دقيق لمعدلك وسلوكياتك الدراسية. النتائج الفعلية تعتمد على التزامك وتطبيقك للاستراتيجيات المقترحة. يمكنك تحديث ملفك المعرفي في أي وقت للحصول على توصيات محدثة.'
              : 'This plan is based on precise numeric analysis of your GPA and study behaviors. Actual results depend on your commitment and application of suggested strategies. You can update your cognitive profile anytime for refreshed recommendations.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

interface IntegratedRecommendationCardProps {
  recommendation: IntegratedRecommendation;
  index: number;
  language: 'ar' | 'en';
}

function IntegratedRecommendationCard({
  recommendation,
  index,
  language,
}: IntegratedRecommendationCardProps) {
  const { improvementAction, recommendedStrategy, integratedPriority } = recommendation;

  const getPriorityColor = (priority: number) => {
    if (priority >= 70) return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
    if (priority >= 40) return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
    return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
  };

  const getPriorityText = (priority: number) => {
    if (priority >= 70) return language === 'ar' ? 'أولوية عالية' : 'High Priority';
    if (priority >= 40) return language === 'ar' ? 'أولوية متوسطة' : 'Medium Priority';
    return language === 'ar' ? 'أولوية منخفضة' : 'Low Priority';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3 flex-1">
            <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center shrink-0 font-bold text-primary">
              {index + 1}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg mb-2">
                {improvementAction.courseName}
              </CardTitle>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span>{improvementAction.courseCode}</span>
                <span>•</span>
                <span>{improvementAction.creditHours} {language === 'ar' ? 'ساعة' : 'hrs'}</span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className={getPriorityColor(integratedPriority)}>
            {getPriorityText(integratedPriority)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* تحسين الدرجة */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            {language === 'ar' ? 'تحسين المعدل' : 'GPA Improvement'}
          </h4>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-base">
                {improvementAction.currentGrade}
              </Badge>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <Badge className="bg-primary text-primary-foreground text-base">
                {improvementAction.suggestedGrade}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                +{improvementAction.gpaImprovement.toFixed(3)}
              </div>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' ? 'تحسين المعدل' : 'GPA Gain'}
              </p>
            </div>
          </div>
        </div>

        {/* الاستراتيجية الموصى بها */}
        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-900">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-blue-900 dark:text-blue-100">
            <Brain className="h-4 w-4" />
            {language === 'ar' ? 'الاستراتيجية المناسبة لك' : 'Strategy Suited for You'}
          </h4>
          <p className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            {language === 'ar' ? recommendedStrategy.nameAr : recommendedStrategy.nameEn}
          </p>
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
            {language === 'ar' ? recommendedStrategy.descriptionAr : recommendedStrategy.descriptionEn}
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-300 italic">
            {language === 'ar' ? recommendation.matchReasonAr : recommendation.matchReason}
          </p>
        </div>

        {/* خطوات التطبيق */}
        <div>
          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            {language === 'ar' ? 'كيف تطبق هذا' : 'How to Apply This'}
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {(language === 'ar' ? recommendation.personalizedTipsAr : recommendation.personalizedTipsEn).map(
              (tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{tip}</span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* الفائدة السلوكية */}
        <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3 border border-green-200 dark:border-green-900">
          <p className="text-sm text-green-800 dark:text-green-200">
            <strong>{language === 'ar' ? 'الفائدة السلوكية: ' : 'Behavioral Benefit: '}</strong>
            {language === 'ar' ? recommendation.behavioralBenefitAr : recommendation.behavioralBenefit}
          </p>
        </div>

        {/* تحذيرات إن وجدت */}
        {recommendation.behavioralBottlenecks.length > 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              {language === 'ar'
                ? 'قد تحتاج لتحسين بعض السلوكيات أولاً لتحقيق أفضل نتيجة'
                : 'You may need to improve some behaviors first for best results'}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
