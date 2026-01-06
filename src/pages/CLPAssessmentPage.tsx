import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CLP_QUESTIONS, CLPEngine, type CLPAnswer } from '@/lib/clp-engine';
import { clpStorage } from '@/lib/storage';
import { Brain, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CLPAssessmentPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<CLPAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const currentQuestion = CLP_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / CLP_QUESTIONS.length) * 100;
  const isLastQuestion = currentQuestionIndex === CLP_QUESTIONS.length - 1;

  const handleAnswer = () => {
    if (currentAnswer === null) return;

    const newAnswers = [
      ...answers,
      { questionId: currentQuestion.id, value: currentAnswer },
    ];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // حفظ النتائج
      const profile = CLPEngine.generateProfile('local-user', newAnswers);
      clpStorage.save(profile);
      navigate('/clp-results');
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const previousAnswer = answers[currentQuestionIndex - 1];
      setCurrentAnswer(previousAnswer?.value || null);
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  if (showDisclaimer) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">
                  {language === 'ar' ? 'ملف التعلم المعرفي' : 'Cognitive Learning Profile'}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === 'ar' ? 'تقييم سلوكي أكاديمي' : 'Academic Behavioral Assessment'}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ما هو هذا التقييم */}
            <div>
              <h3 className="font-semibold text-lg mb-3">
                {language === 'ar' ? 'ما هو هذا التقييم؟' : 'What is this assessment?'}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'ar'
                  ? 'هذا تقييم قصير (10-15 دقيقة) يحلل سلوكياتك الدراسية لمساعدتك على تحسين أدائك الأكاديمي. يقيس التقييم 6 مجالات سلوكية مرتبطة بالنجاح الأكاديمي.'
                  : 'This is a short assessment (10-15 minutes) that analyzes your study behaviors to help improve your academic performance. It measures 6 behavioral domains linked to academic success.'}
              </p>
            </div>

            {/* إخلاء مسؤولية مهم */}
            <Alert className="border-2 border-primary/20 bg-primary/5">
              <AlertCircle className="h-5 w-5 text-primary" />
              <AlertDescription className="text-sm leading-relaxed">
                <strong className="block mb-2">
                  {language === 'ar' ? '⚠️ إخلاء مسؤولية مهم' : '⚠️ Important Disclaimer'}
                </strong>
                {language === 'ar'
                  ? 'هذا التقييم يدعم تحسين استراتيجيات المذاكرة ولا يمثل تشخيصاً نفسياً أو أكاديمياً. جميع السلوكيات المقاسة قابلة للتحسين والتعديل. النتائج إرشادية وليست حتمية.'
                  : 'This assessment supports study strategy improvement and does not represent psychological or academic diagnosis. All measured behaviors are adjustable and improvable. Results are advisory and not deterministic.'}
              </AlertDescription>
            </Alert>

            {/* ما الذي سيتم قياسه */}
            <div>
              <h3 className="font-semibold text-lg mb-3">
                {language === 'ar' ? 'المجالات المقاسة:' : 'Measured Domains:'}
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'استدامة التركيز' : 'Focus Sustainability'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'إدارة الوقت والتخطيط' : 'Time Management & Planning'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'استخدام الاسترجاع النشط' : 'Active Recall Usage'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'ميل التسويف' : 'Procrastination Tendency'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'تحمل الحمل المعرفي' : 'Cognitive Load Tolerance'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'استجابة ضغط الاختبارات' : 'Exam Stress Response'}</span>
                </li>
              </ul>
            </div>

            {/* الأزرار */}
            <div className="flex gap-3 pt-4">
              <Button onClick={() => setShowDisclaimer(false)} size="lg" className="flex-1">
                {language === 'ar' ? 'ابدأ التقييم' : 'Start Assessment'}
              </Button>
              <Button onClick={handleSkip} variant="outline" size="lg">
                {language === 'ar' ? 'تخطي الآن' : 'Skip for Now'}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              {language === 'ar'
                ? 'يمكنك إعادة التقييم في أي وقت من صفحة الإعدادات'
                : 'You can retake the assessment anytime from Settings'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* شريط التقدم */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                {language === 'ar' ? 'التقدم' : 'Progress'}
              </span>
              <span className="text-muted-foreground">
                {currentQuestionIndex + 1} / {CLP_QUESTIONS.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* السؤال */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {language === 'ar' ? currentQuestion.textAr : currentQuestion.textEn}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={currentAnswer?.toString()}
            onValueChange={(value) => setCurrentAnswer(Number.parseInt(value))}
          >
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 space-x-reverse p-4 rounded-lg border-2 hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => setCurrentAnswer(option.value)}
                >
                  <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                  <Label
                    htmlFor={`option-${option.value}`}
                    className="flex-1 cursor-pointer text-base"
                  >
                    {language === 'ar' ? option.textAr : option.textEn}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          {/* الأزرار */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentQuestionIndex === 0}
            >
              {language === 'ar' ? 'السابق' : 'Previous'}
            </Button>
            <Button
              onClick={handleAnswer}
              disabled={currentAnswer === null}
              className="flex-1"
            >
              {isLastQuestion
                ? language === 'ar'
                  ? 'إنهاء التقييم'
                  : 'Finish Assessment'
                : language === 'ar'
                ? 'التالي'
                : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* معلومة */}
      <p className="text-xs text-center text-muted-foreground">
        {language === 'ar'
          ? 'أجب بصدق للحصول على توصيات دقيقة. لا توجد إجابات صحيحة أو خاطئة.'
          : 'Answer honestly for accurate recommendations. There are no right or wrong answers.'}
      </p>
    </div>
  );
}
