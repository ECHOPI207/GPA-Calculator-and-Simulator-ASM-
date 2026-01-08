import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';
import { Header } from './Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with desktop navigation */}
      <div className="print:hidden">
        <Header />
      </div>

      {/* Main Content - Add bottom padding on mobile for bottom nav, and top padding for fixed header */}
      <main className="flex-1 pb-20 lg:pb-0 pt-16">
        <div className="container max-w-7xl mx-auto p-4 lg:p-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <div className="print:hidden">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="print:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
