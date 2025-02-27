import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const PrivateRoute = () => {
  const { accessToken } = useAuth();

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
