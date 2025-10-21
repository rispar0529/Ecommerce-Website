import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@features/auth';

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};
