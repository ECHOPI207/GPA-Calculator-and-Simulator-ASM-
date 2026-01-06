import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  const { language } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">{language === 'ar' ? 'شروط الاستخدام' : 'Terms of Service'}</h1>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {language === 'ar'
              ? 'باستخدامك لمنصة echo-π، فإنك توافق على هذه الشروط. المنصة توفر أدوات مساعدة وتوصيات إرشادية فقط وليست بديلاً عن السجلات الأكاديمية الرسمية.'
              : 'By using echo-π platform, you agree to these terms. The platform provides assistance tools and advisory recommendations only and is not a substitute for official academic records.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
