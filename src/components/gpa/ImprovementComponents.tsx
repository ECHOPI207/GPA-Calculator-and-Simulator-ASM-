import { 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import type { ImprovementAction } from '@/lib/gpa-improvement-engine';

interface ImprovementCardProps {
  action: ImprovementAction;
  onSelect?: (action: ImprovementAction) => void;
}

export function ImprovementCard({ action, onSelect }: ImprovementCardProps) {
  const { language } = useLanguage();

  const getFeasibilityColor = (feasibility: string) => {
    switch (feasibility) {
      case 'easy':
        return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
      case 'moderate':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
      case 'challenging':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getFeasibilityText = (feasibility: string) => {
    switch (feasibility) {
      case 'easy':
        return language === 'ar' ? 'سهل' : 'Easy';
      case 'moderate':
        return language === 'ar' ? 'متوسط' : 'Moderate';
      case 'challenging':
        return language === 'ar' ? 'صعب' : 'Challenging';
      default:
        return feasibility;
    }
  };

  const getImpactColor = (improvement: number) => {
    if (improvement >= 0.1) return 'text-green-600 dark:text-green-400';
    if (improvement >= 0.05) return 'text-blue-600 dark:text-blue-400';
    return 'text-yellow-600 dark:text-yellow-400';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">
              {language === 'ar' ? action.titleAr : action.titleEn}
            </CardTitle>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span>{action.courseCode}</span>
              <span>•</span>
              <span>{action.creditHours} {language === 'ar' ? 'ساعة' : 'hrs'}</span>
            </div>
          </div>
          <Badge variant="outline" className={getFeasibilityColor(action.feasibility)}>
            {getFeasibilityText(action.feasibility)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* تحسين الدرجة */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-base">
              {action.currentGrade}
            </Badge>
            <ArrowRight className={`h-4 w-4 text-muted-foreground ${language === 'ar' ? 'rotate-180' : ''}`} />
            <Badge className="bg-primary text-primary-foreground text-base">
              {action.suggestedGrade}
            </Badge>
          </div>
        </div>

        {/* تأثير المعدل */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {language === 'ar' ? 'المعدل الحالي' : 'Current GPA'}
            </span>
            <span className="font-semibold">{action.currentGPA.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {language === 'ar' ? 'المعدل المتوقع' : 'Projected GPA'}
            </span>
            <span className="font-semibold">{action.projectedGPA.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="font-medium">
              {language === 'ar' ? 'التحسين' : 'Improvement'}
            </span>
            <span className={`font-bold text-lg ${getImpactColor(action.gpaImprovement)}`}>
              +{action.gpaImprovement.toFixed(3)}
            </span>
          </div>
        </div>

        {/* الوصف */}
        <p className="text-sm text-muted-foreground">
          {language === 'ar' ? action.descriptionAr : action.descriptionEn}
        </p>

        {/* نقاط التأثير */}
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all"
              style={{ width: `${Math.min(action.impactScore, 100)}%` }}
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {Math.round(action.impactScore)}
          </span>
        </div>

        {onSelect && (
          <Button
            onClick={() => onSelect(action)}
            className="w-full"
            variant="outline"
          >
            <CheckCircle2 className="h-4 w-4 me-2" />
            {language === 'ar' ? 'اختيار هذا الإجراء' : 'Select This Action'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

interface ImprovementSectionProps {
  title: string;
  icon: React.ReactNode;
  actions: ImprovementAction[];
  emptyMessage: string;
  onSelectAction?: (action: ImprovementAction) => void;
}

export function ImprovementSection({
  title,
  icon,
  actions,
  emptyMessage,
  onSelectAction,
}: ImprovementSectionProps) {
  if (actions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">{emptyMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-2xl font-bold">{title}</h2>
        <Badge variant="secondary" className="ms-auto">
          {actions.length}
        </Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => (
          <ImprovementCard
            key={action.id}
            action={action}
            onSelect={onSelectAction}
          />
        ))}
      </div>
    </div>
  );
}

interface ImprovementSummaryProps {
  currentGPA: number;
  maxPossibleGPA: number;
  realisticTargetGPA: number;
  totalActions: number;
}

export function ImprovementSummary({
  currentGPA,
  maxPossibleGPA,
  realisticTargetGPA,
  totalActions,
}: ImprovementSummaryProps) {
  const { language } = useLanguage();

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {language === 'ar' ? 'المعدل الحالي' : 'Current GPA'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{currentGPA.toFixed(2)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {language === 'ar' ? 'الهدف الواقعي' : 'Realistic Target'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {realisticTargetGPA.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            +{(realisticTargetGPA - currentGPA).toFixed(2)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {language === 'ar' ? 'أقصى معدل ممكن' : 'Maximum Possible'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {maxPossibleGPA.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            +{(maxPossibleGPA - currentGPA).toFixed(2)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {language === 'ar' ? 'إجراءات متاحة' : 'Available Actions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalActions}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {language === 'ar' ? 'فرصة للتحسين' : 'opportunities'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
