import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Calculator,
  FlaskConical,
  Clock,
  FileText,
  Settings,
  Menu,
} from 'lucide-react';
import { Header } from './Header';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { t } = useLanguage();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: t('nav.dashboard'), path: '/' },
    { icon: Calculator, label: t('nav.calculator'), path: '/calculator' },
    { icon: FlaskConical, label: t('nav.simulator'), path: '/simulator' },
    { icon: Clock, label: t('nav.timeline'), path: '/timeline' },
    { icon: FileText, label: t('nav.reports'), path: '/reports' },
    { icon: Settings, label: t('nav.settings'), path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* الهيدر */}
      <Header />
      
      {/* التخطيط الرئيسي */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* القائمة الجانبية للشاشات الكبيرة */}
        <aside className="hidden lg:flex w-64 flex-col border-e border-border bg-card">
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* زر القائمة للموبايل */}
        <div className="lg:hidden fixed bottom-6 end-6 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-bold text-foreground">القائمة</h2>
                </div>
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all',
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* المحتوى الرئيسي */}
        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-7xl mx-auto p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
