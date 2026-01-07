import { Calculator, Target, TrendingUp } from 'lucide-react';
import { TabLayout } from '@/components/common/TabLayout';
import PageMeta from '@/components/common/PageMeta';
import { useLanguage } from '@/contexts/LanguageContext';

// Import existing page components
import CalculatorPage from './CalculatorPage';
import ImprovementPage from './ImprovementPage';
import SimulatorPage from './SimulatorPage';

export default function GPAPage() {
  const { language } = useLanguage();

  const tabs = [
    {
      id: 'overview',
      label: language === 'ar' ? 'نظرة عامة' : 'Overview',
      icon: <Calculator className="h-4 w-4" />,
    },
    {
      id: 'improve',
      label: language === 'ar' ? 'تحسين المعدل' : 'Improve GPA',
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      id: 'predictions',
      label: language === 'ar' ? 'التنبؤات' : 'Predictions',
      icon: <Target className="h-4 w-4" />,
    },
  ];

  return (
    <div>
      <PageMeta 
        title={language === 'ar' ? 'إدارة المعدل | المساعد الأكاديمي' : 'GPA Management | Academic Assistant'}
        description={language === 'ar' ? 'أدوات حساب وتحسين وتوقع المعدل التراكمي.' : 'Tools for calculating, improving, and predicting your GPA.'}
      />
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {language === 'ar' ? 'إدارة المعدل الأكاديمي' : 'GPA Management'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {language === 'ar'
            ? 'احسب معدلك، حسّنه، وتنبأ بنتائجك المستقبلية'
            : 'Calculate, improve, and predict your academic performance'}
        </p>
      </div>

      <TabLayout tabs={tabs} defaultTab="overview">
        {(activeTab) => {
          switch (activeTab) {
            case 'overview':
              return <CalculatorPage />;
            case 'improve':
              return <ImprovementPage />;
            case 'predictions':
              return <SimulatorPage />;
            default:
              return <CalculatorPage />;
          }
        }}
      </TabLayout>
    </div>
  );
}
