import { Brain, Calculator, FileText, Languages, LayoutDashboard, Moon, Settings, Sun, UserCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navItems = [
    {
      path: '/',
      icon: LayoutDashboard,
      label: t('nav.dashboard'),
    },
    {
      path: '/gpa',
      icon: Calculator,
      label: t('nav.gpa'),
    },
    {
      path: '/learning',
      icon: Brain,
      label: t('nav.learning'),
    },
    {
      path: '/reports',
      icon: FileText,
      label: t('nav.reports'),
    },
    {
      path: '/settings',
      icon: Settings,
      label: t('nav.settings'),
    },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 h-16 transition-all duration-300">
      <div className="container mx-auto max-w-7xl h-full px-4 lg:px-8 flex items-center justify-between gap-4">

        {/* Logo Section */}
        <div className="flex-shrink-0 flex items-center">
          <Logo className="scale-90 origin-left rtl:origin-right" />
        </div>

        {/* Desktop Navigation - Centered using flex-1 */}
        <nav className="hidden lg:flex items-center justify-center flex-1 gap-1 xl:gap-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  'hover:bg-primary/5 hover:text-primary',
                  isActive
                    ? 'text-primary bg-primary/10 shadow-sm shadow-primary/5 ring-1 ring-primary/20'
                    : 'text-muted-foreground'
                )}
              >
                <Icon className={cn("h-4 w-4", isActive && "fill-current")} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-[10px] h-[3px] bg-primary rounded-t-full shadow-[0_-2px_6px_rgba(var(--primary),0.4)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions Section */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="w-9 h-9 rounded-full transition-transform hover:rotate-180 duration-500"
            title={language === 'en' ? 'العربية' : 'English'}
          >
            <Languages className="h-4 w-4" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full transition-transform hover:rotate-12 duration-300"
            title={theme === 'light' ? 'الوضع الداكن' : 'الوضع الفاتح'}
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 h-9 rounded-full text-muted-foreground hover:text-foreground">
                <UserCircle className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem disabled>
                Profile (Coming Soon)
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">{t('nav.settings')}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  );
}
