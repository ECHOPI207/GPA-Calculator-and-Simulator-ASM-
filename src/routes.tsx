import DashboardPage from './pages/DashboardPage';
import GPAPage from './pages/GPAPage';
import LearningPage from './pages/LearningPage';
import ReportsPage from './pages/ReportsPage';
import CLPAssessmentPage from './pages/CLPAssessmentPage';
import SettingsPage from './pages/SettingsPage';
import HowToUsePage from './pages/HowToUsePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import AboutPage from './pages/AboutPage';
import type { ReactNode } from 'react';

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
    element: <DashboardPage />
  },
  {
    name: 'GPA',
    path: '/gpa',
    element: <GPAPage />
  },
  {
    name: 'Learning',
    path: '/learning',
    element: <LearningPage />
  },
  {
    name: 'Reports',
    path: '/reports',
    element: <ReportsPage />
  },
  {
    name: 'Settings',
    path: '/settings',
    element: <SettingsPage />
  },
  {
    name: 'CLP Assessment',
    path: '/clp-assessment',
    element: <CLPAssessmentPage />,
    visible: false
  },
  {
    name: 'How to Use',
    path: '/how-to-use',
    element: <HowToUsePage />,
    visible: false
  },
  {
    name: 'Privacy',
    path: '/privacy',
    element: <PrivacyPage />,
    visible: false
  },
  {
    name: 'Terms',
    path: '/terms',
    element: <TermsPage />,
    visible: false
  },
  {
    name: 'About',
    path: '/about',
    element: <AboutPage />,
    visible: false
  }
];

export default routes;
