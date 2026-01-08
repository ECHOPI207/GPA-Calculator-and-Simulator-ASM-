import { Calculator, Info, Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { TabLayout } from '@/components/common/TabLayout';
import PageMeta from '@/components/common/PageMeta';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { GradingScales } from '@/components/common/GradingScales';

// Import existing page components
import CalculatorPage from './CalculatorPage';
import ImprovementPage from './ImprovementPage';
import SimulatorPage from './SimulatorPage';

export default function GPAPage() {
  const { language } = useLanguage();
  const [isScalesOpen, setIsScalesOpen] = useState(false);

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
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {language === 'ar' ? 'إدارة المعدل الأكاديمي' : 'GPA Management'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'ar'
              ? 'احسب معدلك، حسّنه، وتنبأ بنتائجك المستقبلية'
              : 'Calculate, improve, and predict your academic performance'}
          </p>
        </div>

        {/* Grading System Info Button */}
        <Dialog open={isScalesOpen} onOpenChange={setIsScalesOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap">
              <Info className="h-4 w-4" />
              {language === 'ar' ? 'نظام التقديرات' : 'Grading System'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {language === 'ar' ? 'نظام التقديرات والمعدلات' : 'Grading & Classification System'}
              </DialogTitle>
              <DialogDescription>
                {language === 'ar'
                  ? 'تعرف على كيفية حساب المعدل التراكمي والتقديرات'
                  : 'Learn how GPA and classifications are calculated'}
              </DialogDescription>
            </DialogHeader>
            <GradingScales />
          </DialogContent>
        </Dialog>
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
