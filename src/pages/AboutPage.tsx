import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

export default function AboutPage() {
  const { language } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">{language === 'ar' ? 'من نحن' : 'About Us'}</h1>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground leading-relaxed mb-4">
            {language === 'ar'
              ? 'echo-π هي منصة ذكية لتحليل وتحسين المعدل الأكاديمي مع استراتيجيات مذاكرة مخصصة مبنية على أسس علمية.'
              : 'echo-π is an intelligent platform for analyzing and improving academic GPA with personalized study strategies based on scientific foundations.'}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{language === 'ar' ? 'صُنع بـ' : 'Made with'}</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>{language === 'ar' ? 'بواسطة' : 'by'} <strong className="text-primary">echo-π Team</strong></span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
