/* eslint-disable react-refresh/only-export-components */
import { lazy, type ComponentType, type ReactNode } from 'react';
import type { UserRole } from '@/types';

const page = <T extends Record<string, ComponentType>>(loader: () => Promise<T>, name: keyof T) =>
  lazy(async () => ({ default: (await loader())[name] }));

const LandingPage = page(() => import('@/features/landing/pages/LandingPage'), 'LandingPage');
const LoginPage = page(() => import('@/features/auth/pages/LoginPage'), 'LoginPage');
const SignUpPage = page(() => import('@/features/auth/pages/SignUpPage'), 'SignUpPage');
const StudentDashboard = page(() => import('@/features/dashboard/pages/StudentDashboard'), 'StudentDashboard');
const DataIngestionPage = page(() => import('@/features/ingestion/pages/DataIngestionPage'), 'DataIngestionPage');
const EvaluationPage = page(() => import('@/features/evaluation/pages/EvaluationPage'), 'EvaluationPage');
const AnalyticsPage = page(() => import('@/features/analytics/pages/AnalyticsPage'), 'AnalyticsPage');
const LearningPathPage = page(() => import('@/features/learning-path/pages/LearningPathPage'), 'LearningPathPage');
const AdminDashboard = page(() => import('@/features/admin/pages/AdminDashboard'), 'AdminDashboard');

export interface AppRoute {
  path: string;
  element: ReactNode;
  /** When set, the route is wrapped in <ProtectedRoute> for these roles. */
  roles?: UserRole[];
}

export const routes: AppRoute[] = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignUpPage /> },
  { path: '/dashboard', element: <StudentDashboard />, roles: ['student'] },
  { path: '/data-ingestion', element: <DataIngestionPage />, roles: ['student'] },
  { path: '/evaluation', element: <EvaluationPage />, roles: ['student'] },
  { path: '/analytics', element: <AnalyticsPage />, roles: ['student'] },
  { path: '/learning-path', element: <LearningPathPage />, roles: ['student'] },
  { path: '/admin', element: <AdminDashboard />, roles: ['admin'] },
];
