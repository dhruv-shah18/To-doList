import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoutes = ({ children }) => {
 const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to={!isAuthenticated ? '/login' : "/alltasks"} replace />;
  }

  return children;
}

export default PrivateRoutes