import { useLanguage } from '@/contexts/LanguageContext';
import { TabLayout } from '@/components/common/TabLayout';
import { Brain, Lightbulb, Target } from 'lucide-react';
import { clpStorage } from '@/lib/storage';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Import CLP components
import CLPResultsPage from './CLPResultsPage';
import IntegratedPlanPage from './IntegratedPlanPage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StrategyMatcher, STUDY_STRATEGIES } from '@/lib/clp-strategies';
import type { CLPProfile } from '@/lib/clp-engine';

export default function LearningPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    setHasProfile(clpStorage.exists());
  }, []);

  const tabs = [
    {
      id: 'profile',
      label: language === 'ar' ? 'الملف المعرفي' : 'Learning Profile',
      icon: <Brain className="h-4 w-4" />,
    },
    {
      id: 'strategies',
      label: language === 'ar' ? 'استراتيجيات المذاكرة' : 'Study Strategies',
      icon: <Lightbulb className="h-4 w-4" />,
    },
    {
      id: 'plan',
      label: language === 'ar' ? 'الخطة المتكاملة' : 'Integrated Plan',
      icon: <Target className="h-4 w-4" />,
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {language === 'ar' ? 'التعلم والمذاكرة' : 'Learning & Study'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {language === 'ar'
            ? 'افهم أسلوب تعلمك واحصل على استراتيجيات مخصصة'
            : 'Understand your learning style and get personalized strategies'}
        </p>
      </div>

      <TabLayout tabs={tabs} defaultTab="profile">
        {(activeTab) => {
          switch (activeTab) {
            case 'profile':
              return <ProfileTab hasProfile={hasProfile} navigate={navigate} />;
            case 'strategies':
              return <StrategiesTab hasProfile={hasProfile} navigate={navigate} />;
            case 'plan':
              return <IntegratedPlanPage />;
            default:
              return <ProfileTab hasProfile={hasProfile} navigate={navigate} />;
          }
        }}
      </TabLayout>
    </div>
  );
}

function ProfileTab({ hasProfile, navigate }: { hasProfile: boolean; navigate: any }) {
  const { language } = useLanguage();

  if (!hasProfile) {
    return (
      <Card className="border-2 border-dashed">
        <CardContent className="py-16 text-center">
          <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">
            {language === 'ar' ? 'لم تكمل التقييم بعد' : 'Assessment Not Completed'}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {language === 'ar'
              ? 'أكمل تقييم الملف المعرفي للحصول على استراتيجيات مذاكرة مخصصة تناسب أسلوبك'
              : 'Complete the cognitive profile assessment to get personalized study strategies'}
          </p>
          <Button onClick={() => navigate('/clp-assessment')} size="lg">
            <Brain className="h-4 w-4 me-2" />
            {language === 'ar' ? 'ابدأ التقييم الآن' : 'Start Assessment Now'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <CLPResultsPage />;
}

function StrategiesTab({ hasProfile, navigate }: { hasProfile: boolean; navigate: any }) {
  const { language } = useLanguage();
  const [profile, setProfile] = useState<CLPProfile | null>(null);
  const [recommendedStrategies, setRecommendedStrategies] = useState(STUDY_STRATEGIES);

  useEffect(() => {
    const savedProfile = clpStorage.get();
    if (savedProfile) {
      setProfile(savedProfile);
      const strategies = StrategyMatcher.getRecommendedStrategies(savedProfile);
      setRecommendedStrategies(strategies.length > 0 ? strategies : STUDY_STRATEGIES.slice(0, 5));
    }
  }, []);

  if (!hasProfile) {
    return (
      <Card className="border-2 border-dashed">
        <CardContent className="py-16 text-center">
          <Lightbulb className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">
            {language === 'ar' ? 'أكمل التقييم أولاً' : 'Complete Assessment First'}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {language === 'ar'
              ? 'للحصول على استراتيجيات مخصصة، يجب إكمال تقييم الملف المعرفي'
              : 'To get personalized strategies, complete the cognitive profile assessment'}
          </p>
          <Button onClick={() => navigate('/clp-assessment')} size="lg">
            {language === 'ar' ? 'ابدأ التقييم' : 'Start Assessment'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {profile && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              {language === 'ar'
                ? 'هذه الاستراتيجيات مخصصة بناءً على ملفك المعرفي'
                : 'These strategies are personalized based on your cognitive profile'}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {recommendedStrategies.map((strategy) => (
          <Card key={strategy.id}>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'ar' ? strategy.nameAr : strategy.nameEn}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'ar' ? strategy.descriptionAr : strategy.descriptionEn}
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-3">
                  {language === 'ar' ? 'كيفية التطبيق:' : 'How to Apply:'}
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {(language === 'ar' ? strategy.applicationAr : strategy.applicationEn).map(
                    (step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{step}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3 border border-green-200 dark:border-green-900">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>{language === 'ar' ? 'الفائدة المتوقعة: ' : 'Expected Benefit: '}</strong>
                  {language === 'ar' ? strategy.expectedBenefitAr : strategy.expectedBenefitEn}
                </p>
              </div>

              <div className="text-xs text-muted-foreground">
                <strong>{language === 'ar' ? 'الأساس العلمي: ' : 'Scientific Basis: '}</strong>
                {strategy.scientificBasis}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
