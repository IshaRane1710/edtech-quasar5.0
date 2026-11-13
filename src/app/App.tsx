import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, ProtectedRoute } from '@/features/auth';
import { PageLoader } from '@/components/feedback/PageLoader';
import { routes } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {routes.map(({ path, element, roles }) => (
              <Route
                key={path}
                path={path}
                element={roles ? <ProtectedRoute roles={roles}>{element}</ProtectedRoute> : element}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
