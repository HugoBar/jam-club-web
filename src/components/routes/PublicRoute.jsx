import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PublicRoute = () => {
  const { accessToken } = useAuth();

  return accessToken ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
