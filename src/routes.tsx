import DashboardPage from './pages/DashboardPage';
import CalculatorPage from './pages/CalculatorPage';
import SimulatorPage from './pages/SimulatorPage';
import TimelinePage from './pages/TimelinePage';
import ReportsPage from './pages/ReportsPage';
import ImprovementPage from './pages/ImprovementPage';
import CLPAssessmentPage from './pages/CLPAssessmentPage';
import CLPResultsPage from './pages/CLPResultsPage';
import IntegratedPlanPage from './pages/IntegratedPlanPage';
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
    name: 'Calculator',
    path: '/calculator',
    element: <CalculatorPage />
  },
  {
    name: 'Simulator',
    path: '/simulator',
    element: <SimulatorPage />
  },
  {
    name: 'Improvement',
    path: '/improvement',
    element: <ImprovementPage />
  },
  {
    name: 'CLP Assessment',
    path: '/clp-assessment',
    element: <CLPAssessmentPage />,
    visible: false
  },
  {
    name: 'CLP Results',
    path: '/clp-results',
    element: <CLPResultsPage />,
    visible: false
  },
  {
    name: 'Integrated Plan',
    path: '/integrated-plan',
    element: <IntegratedPlanPage />,
    visible: false
  },
  {
    name: 'Timeline',
    path: '/timeline',
    element: <TimelinePage />
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
