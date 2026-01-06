import DashboardPage from './pages/DashboardPage';
import CalculatorPage from './pages/CalculatorPage';
import SimulatorPage from './pages/SimulatorPage';
import TimelinePage from './pages/TimelinePage';
import ReportsPage from './pages/ReportsPage';
import ImprovementPage from './pages/ImprovementPage';
import SettingsPage from './pages/SettingsPage';
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
  }
];

export default routes;
