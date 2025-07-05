import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import LoadingScreen from '../components/loadingScreen/LoadingScreen';
import { useAuth } from '../context/hooks/useAuth';

export const ProtectedRoute: FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingScreen />;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
};

export const PublicRoute: FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingScreen />;

  if (user) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};
