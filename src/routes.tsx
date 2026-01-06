import DashboardPage from './pages/DashboardPage';
import CalculatorPage from './pages/CalculatorPage';
import SimulatorPage from './pages/SimulatorPage';
import TimelinePage from './pages/TimelinePage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
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
    name: 'Admin',
    path: '/admin',
    element: <AdminPage />
  },
  {
    name: 'Login',
    path: '/login',
    element: <LoginPage />,
    visible: false
  },
  {
    name: 'Not Found',
    path: '*',
    element: <NotFound />,
    visible: false
  }
];

export default routes;
