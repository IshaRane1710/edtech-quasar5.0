import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { PageLoader } from '@/components/feedback/PageLoader';
import { useAuth } from '@/features/auth/AuthContext';
import type { UserRole } from '@/types';

export function ProtectedRoute({ children, roles }: { children: ReactNode; roles?: UserRole[] }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <PageLoader />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return <>{children}</>;
}
