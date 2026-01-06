import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Calculator,
  FlaskConical,
  Clock,
  FileText,
  Settings,
  Shield,
  Menu,
} from 'lucide-react';
import { Header } from './Header';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { t } = useLanguage();
  const { profile } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: t('nav.dashboard'), path: '/' },
    { icon: Calculator, label: t('nav.calculator'), path: '/calculator' },
    { icon: FlaskConical, label: t('nav.simulator'), path: '/simulator' },
    { icon: Clock, label: t('nav.timeline'), path: '/timeline' },
    { icon: FileText, label: t('nav.reports'), path: '/reports' },
    { icon: Settings, label: t('nav.settings'), path: '/settings' },
  ];

  if (profile?.role === 'admin') {
    menuItems.push({ icon: Shield, label: t('nav.admin'), path: '/admin' });
  }

  const SidebarNav = () => (
    <SidebarContent className="bg-sidebar-background">
      <SidebarGroup>
        <SidebarGroupLabel className="text-lg font-bold text-sidebar-foreground px-4 py-3">
          <div className="bg-gradient-to-r from-sidebar-primary to-sidebar-primary/70 bg-clip-text text-transparent">
            echo-π
          </div>
        </SidebarGroupLabel>
        <SidebarGroupContent className="px-2">
          <SidebarMenu>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive}
                    className={cn(
                      "transition-all duration-200",
                      isActive && "bg-sidebar-accent font-semibold"
                    )}
                  >
                    <Link to={item.path}>
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <SidebarProvider>
          <Sidebar className="hidden lg:block border-e border-border">
            <SidebarNav />
          </Sidebar>
          
          {/* Mobile Menu */}
          <div className="lg:hidden fixed bottom-4 start-4 z-50">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="default" className="rounded-full shadow-lg h-14 w-14">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 bg-sidebar-background border-sidebar-border">
                <div className="py-6">
                  <div className="px-6 py-3 text-xl font-bold">
                    <div className="bg-gradient-to-r from-sidebar-primary to-sidebar-primary/70 bg-clip-text text-transparent">
                      echo-π
                    </div>
                  </div>
                  <nav className="mt-6 space-y-1 px-3">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200',
                            isActive
                              ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                              : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
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

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-4 md:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}
