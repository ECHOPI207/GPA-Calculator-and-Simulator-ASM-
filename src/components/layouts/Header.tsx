import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="h-16 border-b border-border bg-card">
      <div className="h-full px-6 flex items-center justify-between">
        {/* الشعار */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-primary">echo-π</h1>
          <span className="hidden md:inline-block text-sm text-muted-foreground">
            {t('app.tagline')}
          </span>
        </div>

        {/* الإجراءات */}
        <div className="flex items-center gap-2">
          {/* تبديل اللغة */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            title={language === 'en' ? 'العربية' : 'English'}
          >
            <Languages className="h-5 w-5" />
          </Button>

          {/* تبديل الثيم */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title={theme === 'light' ? 'الوضع الداكن' : 'الوضع الفاتح'}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
