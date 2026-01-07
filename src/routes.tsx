import { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

// Lazy load pages
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CLPAssessmentPage = lazy(() => import('./pages/CLPAssessmentPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const GPAPage = lazy(() => import('./pages/GPAPage'));
const HowToUsePage = lazy(() => import('./pages/HowToUsePage'));
const LearningPage = lazy(() => import('./pages/LearningPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Loading component
const PageLoader = () => (
  <div className="flex h-[50vh] w-full items-center justify-center">
    <Loader2 className="text-primary h-8 w-8 animate-spin" />
  </div>
);

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Dashboard',
    path: '/',
    element: (
      <Suspense fallback={<PageLoader />}>
        <DashboardPage />
      </Suspense>
    )
  },
  {
    name: 'GPA',
    path: '/gpa',
    element: (
      <Suspense fallback={<PageLoader />}>
        <GPAPage />
      </Suspense>
    )
  },
  {
    name: 'Learning',
    path: '/learning',
    element: (
      <Suspense fallback={<PageLoader />}>
        <LearningPage />
      </Suspense>
    )
  },
  {
    name: 'Reports',
    path: '/reports',
    element: (
      <Suspense fallback={<PageLoader />}>
        <ReportsPage />
      </Suspense>
    )
  },
  {
    name: 'Settings',
    path: '/settings',
    element: (
      <Suspense fallback={<PageLoader />}>
        <SettingsPage />
      </Suspense>
    )
  },
  {
    name: 'CLP Assessment',
    path: '/clp-assessment',
    element: (
      <Suspense fallback={<PageLoader />}>
        <CLPAssessmentPage />
      </Suspense>
    ),
    visible: false
  },
  {
    name: 'How to Use',
    path: '/how-to-use',
    element: (
      <Suspense fallback={<PageLoader />}>
        <HowToUsePage />
      </Suspense>
    ),
    visible: false
  },
  {
    name: 'Privacy',
    path: '/privacy',
    element: (
      <Suspense fallback={<PageLoader />}>
        <PrivacyPage />
      </Suspense>
    ),
    visible: false
  },
  {
    name: 'Terms',
    path: '/terms',
    element: (
      <Suspense fallback={<PageLoader />}>
        <TermsPage />
      </Suspense>
    ),
    visible: false
  },
  {
    name: 'About',
    path: '/about',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AboutPage />
      </Suspense>
    ),
    visible: false
  },
  {
    name: 'Not Found',
    path: '*',
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFoundPage />
      </Suspense>
    ),
    visible: false
  }
];

export default routes;
