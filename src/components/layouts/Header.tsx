import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Logo } from '@/components/common/Logo';

export function Header() {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="h-16 border-b border-border bg-card sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-card/95">
      <div className="h-full px-6 flex items-center justify-between max-w-7xl mx-auto">
        {/* اللوجو */}
        <Logo />

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
