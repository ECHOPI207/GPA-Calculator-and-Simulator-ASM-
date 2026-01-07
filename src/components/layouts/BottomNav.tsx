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
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-t border-border shadow-lg"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
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
                'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[60px] active:scale-95',
                'hover:bg-accent',
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground'
              )}
            >
              <Icon className={cn('h-5 w-5 transition-transform', isActive && 'scale-110')} />
              <span className="text-xs font-medium leading-none">
                {item.labelShort}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
