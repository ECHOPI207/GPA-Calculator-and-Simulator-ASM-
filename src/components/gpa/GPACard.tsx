import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import type { GPAClassification } from '@/types/types';

interface GPACardProps {
  title: string;
  gpa: number;
  classification?: GPAClassification;
  classificationNameEn?: string;
  classificationNameAr?: string;
  subtitle?: string;
  className?: string;
}

export function GPACard({
  title,
  gpa,
  classification,
  classificationNameEn,
  classificationNameAr,
  subtitle,
  className
}: GPACardProps) {
  const { language } = useLanguage();

  const getClassificationColor = (classification?: GPAClassification) => {
    switch (classification) {
      case 'excellent':
        return 'bg-success text-success-foreground';
      case 'very_good':
        return 'bg-info text-info-foreground';
      case 'good':
        return 'bg-warning text-warning-foreground';
      case 'pass':
        return 'bg-secondary text-secondary-foreground';
      case 'fail':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const classificationName = language === 'ar' ? classificationNameAr : classificationNameEn;

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-4xl font-bold text-primary">
            {gpa.toFixed(2)}
          </div>
          <div className="text-lg text-muted-foreground">/ 4.00</div>
        </div>
        {classification && classificationName && (
          <Badge className={cn('mt-3', getClassificationColor(classification))}>
            {classificationName}
          </Badge>
        )}
        {subtitle && (
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ title, value, subtitle, icon, className }: StatCardProps) {
  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
