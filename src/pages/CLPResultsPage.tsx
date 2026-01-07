import { AlertCircle, ArrowRight, Brain, CheckCircle2, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import type { CLPDomainResult, CLPProfile } from '@/lib/clp-engine';
import { clpStorage } from '@/lib/storage';

export default function CLPResultsPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<CLPProfile | null>(null);

  useEffect(() => {
    const savedProfile = clpStorage.get();
    if (!savedProfile) {
      navigate('/clp-assessment');
      return;
    }
    setProfile(savedProfile);
  }, [navigate]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">
            {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
      case 'low':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'high':
        return language === 'ar' ? 'مرتفع' : 'High';
      case 'medium':
        return language === 'ar' ? 'متوسط' : 'Medium';
      case 'low':
        return language === 'ar' ? 'منخفض' : 'Low';
      default:
        return level;
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* العنوان */}
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-primary/10 p-3">
          <Brain className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {language === 'ar' ? 'ملفك المعرفي للتعلم' : 'Your Cognitive Learning Profile'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'ar'
              ? 'تحليل سلوكياتك الدراسية وتوصيات مخصصة'
              : 'Analysis of your study behaviors and personalized recommendations'}
          </p>
        </div>
      </div>

      {/* إخلاء المسؤولية */}
      <Alert className="border-2 border-primary/20 bg-primary/5">
        <AlertCircle className="h-5 w-5 text-primary" />
        <AlertDescription className="text-sm">
          {language === 'ar'
            ? 'هذه النتائج قابلة للتحسين ولا تعكس قدراتك أو ذكاءك. جميع السلوكيات المقاسة يمكن تطويرها من خلال الممارسة والاستراتيجيات المناسبة.'
            : 'These results are adjustable and do not reflect your abilities or intelligence. All measured behaviors can be developed through practice and appropriate strategies.'}
        </AlertDescription>
      </Alert>

      {/* النتيجة الإجمالية */}
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">
                {Math.round(profile.overallScore)}
              </div>
              <p className="text-muted-foreground">
                {language === 'ar' ? 'النتيجة الإجمالية' : 'Overall Score'}
              </p>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {language === 'ar'
                ? 'هذه النتيجة تمثل متوسط سلوكياتك الدراسية الحالية عبر جميع المجالات'
                : 'This score represents the average of your current study behaviors across all domains'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* المجالات */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          {language === 'ar' ? 'تفاصيل المجالات' : 'Domain Details'}
        </h2>

        {profile.domains.map((domain: CLPDomainResult) => (
          <Card key={domain.domain}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">
                    {language === 'ar' ? domain.nameAr : domain.nameEn}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? domain.descriptionAr : domain.descriptionEn}
                  </p>
                </div>
                <Badge variant="outline" className={getLevelColor(domain.level)}>
                  {getLevelText(domain.level)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* شريط التقدم */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {language === 'ar' ? 'النتيجة' : 'Score'}
                  </span>
                  <span className="font-semibold">{Math.round(domain.score)}/100</span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${getProgressColor(domain.score)}`}
                    style={{ width: `${domain.score}%` }}
                  />
                </div>
              </div>

              {/* نصائح التحسين */}
              {domain.level !== 'high' && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {language === 'ar' ? 'نصائح للتحسين' : 'Improvement Tips'}
                  </h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {(language === 'ar' ? domain.improvementTipsAr : domain.improvementTipsEn).map(
                      (tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* الخطوات التالية */}
      <Card className="bg-gradient-to-br from-blue-50 to-background dark:from-blue-950/20 border-blue-200 dark:border-blue-900">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  {language === 'ar' ? 'الخطوة التالية' : 'Next Step'}
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {language === 'ar'
                    ? 'احصل الآن على خطة عمل مخصصة تجمع بين تحسين معدلك واستراتيجيات المذاكرة المناسبة لملفك المعرفي'
                    : 'Get a personalized action plan that combines GPA improvement with study strategies suited to your cognitive profile'}
                </p>
              </div>
              <Button asChild size="lg">
                <Link to="/learning?tab=plan">
                  {language === 'ar' ? 'عرض خطة العمل المتكاملة' : 'View Integrated Action Plan'}
                  <ArrowRight className="h-4 w-4 ms-2" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* إعادة التقييم */}
      <div className="flex justify-center pt-4">
        <Button
          variant="outline"
          onClick={() => {
            clpStorage.delete();
            navigate('/clp-assessment');
          }}
        >
          {language === 'ar' ? 'إعادة التقييم' : 'Retake Assessment'}
        </Button>
      </div>
    </div>
  );
}
