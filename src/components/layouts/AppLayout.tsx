import { Header } from './Header';
import { Footer } from './Footer';
import { BottomNav } from './BottomNav';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

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
      <Header />

      {/* Main Content - Add bottom padding on mobile for bottom nav */}
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container max-w-7xl mx-auto p-4 lg:p-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
