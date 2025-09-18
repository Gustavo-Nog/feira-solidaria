import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const AdminRoute = () => {
  const { isAuthenticated, usuario, loading } = useUser();

  if (loading) {
    return <div>A verificar permissões...</div>;
  }

  if (!isAuthenticated || usuario?.usuario?.tipo !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;