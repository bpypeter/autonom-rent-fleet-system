
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  // Force immediate redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      console.log('Not authenticated, forcing redirect to login');
      window.location.replace('/login');
    }
  }, [isAuthenticated]);

  // Double check - if not authenticated, redirect immediately
  if (!isAuthenticated) {
    console.log('Index: User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Redirect based on user role
  const getDefaultRoute = () => {
    switch (user?.role) {
      case 'admin':
        return '/dashboard';
      case 'operator':
        return '/dashboard';  // Changed from '/fleet' to '/dashboard'
      case 'client':
        return '/vehicles';   // Clients go to vehicles, not dashboard
      default:
        return '/vehicles';
    }
  };

  return <Navigate to={getDefaultRoute()} replace />;
};

export default Index;
