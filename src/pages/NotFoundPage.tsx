import { AlertTriangle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NotFoundPage() {
  const { language } = useLanguage();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 text-center">
      <PageMeta 
        title={language === 'ar' ? 'الصفحة غير موجودة - 404' : 'Page Not Found - 404'}
        description={language === 'ar' ? 'الصفحة التي تبحث عنها غير موجودة.' : 'The page you are looking for does not exist.'}
      />
      <div className="bg-destructive/10 text-destructive mb-6 flex h-24 w-24 items-center justify-center rounded-full">
        <AlertTriangle className="h-12 w-12" />
      </div>
      
      <h1 className="mb-2 text-4xl font-bold">
        {language === 'ar' ? '404 - الصفحة غير موجودة' : '404 - Page Not Found'}
      </h1>
      
      <p className="text-muted-foreground mb-8 max-w-md text-lg">
        {language === 'ar' 
          ? 'عذراً، الصفحة التي تحاول الوصول إليها غير موجودة أو تم نقلها.' 
          : "Sorry, the page you are looking for doesn't exist or has been moved."}
      </p>
      
      <Button asChild size="lg">
        <Link to="/" className="gap-2">
          <Home className="h-5 w-5" />
          {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
        </Link>
      </Button>
    </div>
  );
}
