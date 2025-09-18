import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useUser();

  if (loading) {
    return <div>Verificando sessão...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;