import { Brain, Calculator, FileText, LayoutDashboard, Settings } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const { t, language } = useLanguage();
  const location = useLocation();

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const navItems = [
    {
      path: '/',
      icon: LayoutDashboard,
      label: t('nav.dashboard'),
      labelShort: language === 'ar' ? 'الرئيسية' : 'Home',
    },
    {
      path: '/gpa',
      icon: Calculator,
      label: t('nav.gpa'),
      labelShort: language === 'ar' ? 'المعدل' : 'GPA',
    },
    {
      path: '/learning',
      icon: Brain,
      label: t('nav.learning'),
      labelShort: language === 'ar' ? 'التعلم' : 'Learn',
    },
    {
      path: '/reports',
      icon: FileText,
      label: t('nav.reports'),
      labelShort: language === 'ar' ? 'التقارير' : 'Reports',
    },
    {
      path: '/settings',
      icon: Settings,
      label: t('nav.settings'),
      labelShort: language === 'ar' ? 'الإعدادات' : 'Settings',
    },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 border-t border-border/40 shadow-2xl safe-p-b mx-auto"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="flex items-center justify-around h-16 sm:h-20 px-4 max-w-lg mx-auto">
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
                'relative flex flex-col items-center justify-center gap-1 rounded-2xl w-full h-full transition-all duration-300',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={cn(
                  "p-1.5 rounded-xl transition-all duration-300",
                  isActive ? "bg-primary/10 translate-y-[-2px]" : "bg-transparent"
                )}
              >
                <Icon className={cn('h-5 w-5 sm:h-6 sm:w-6 transition-all', isActive && "fill-current")} />
              </div>
              <span className={cn(
                "text-[10px] sm:text-xs font-semibold leading-none transition-all",
                isActive ? "font-bold" : "font-medium"
              )}>
                {item.labelShort}
              </span>
              {isActive && (
                <span className="absolute top-0 inset-x-4 h-[2px] bg-primary rounded-b-full shadow-[0_2px_10px_rgba(var(--primary),0.5)]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
