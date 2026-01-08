import { GraduationCap, Languages, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import PageMeta from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/hooks/use-theme';
import { useToast } from '@/hooks/use-toast';
import { UNIVERSITIES, DEFAULT_UNIVERSITY } from '@/lib/university-rules';

export default function SettingsPage() {

  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const [selectedUniversityId, setSelectedUniversityId] = useState(() => {
    return localStorage.getItem('universityId') || DEFAULT_UNIVERSITY.id;
  });

  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    setLanguage(newLanguage);
    toast({
      title: t('common.success'),
      description: t('message.languageChanged'),
    });
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    toast({
      title: t('common.success'),
      description: t('message.themeChanged'),
    });
  };

  const handleUniversityChange = (universityId: string) => {
    setSelectedUniversityId(universityId);
    localStorage.setItem('universityId', universityId);
    const university = UNIVERSITIES.find(u => u.id === universityId);
    toast({
      title: t('common.success'),
      description: language === 'ar'
        ? `تم تغيير النظام إلى ${university?.nameAr}`
        : `Changed system to ${university?.nameEn}`,
    });

    // Reload page to recalculate all GPA with new university rules
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageMeta
        title={language === 'ar' ? 'الإعدادات | المساعد الأكاديمي' : 'Settings | Academic Assistant'}
        description={language === 'ar' ? 'تخصيص تفضيلات التطبيق واللغة والمظهر.' : 'Customize app preferences, language, and theme.'}
      />
      <div>
        <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
        <p className="text-muted-foreground mt-2">
          {language === 'ar' ? 'إدارة التفضيلات وإعدادات الحساب' : 'Manage your preferences and account settings'}
        </p>
      </div>

      {/* University Settings - Moved to top */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            {t('settings.university')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t('settings.selectUniversity')}</Label>
            <Select value={selectedUniversityId} onValueChange={handleUniversityChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {UNIVERSITIES.map(university => (
                  <SelectItem key={university.id} value={university.id}>
                    {language === 'ar' ? university.nameAr : university.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              {t('settings.universityRulesApplied')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            {t('settings.language')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{language === 'ar' ? 'اختر اللغة' : 'Select Language'}</Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية (Arabic)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'اختر لغتك المفضلة للواجهة' : 'Choose your preferred language for the interface'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            {t('settings.theme')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{language === 'ar' ? 'اختر المظهر' : 'Select Theme'}</Label>
            <div className="flex gap-3">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => handleThemeChange('light')}
                className="flex-1"
              >
                <Sun className="h-4 w-4 me-2" />
                {t('settings.lightMode')}
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => handleThemeChange('dark')}
                className="flex-1"
              >
                <Moon className="h-4 w-4 me-2" />
                {t('settings.darkMode')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
