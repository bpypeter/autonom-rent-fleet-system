
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  // Force redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on user role
  const getDefaultRoute = () => {
    switch (user?.role) {
      case 'admin':
        return '/dashboard';
      case 'operator':
        return '/fleet';
      case 'client':
        return '/vehicles';
      default:
        return '/vehicles';
    }
  };

  return <Navigate to={getDefaultRoute()} replace />;
};

export default Index;
