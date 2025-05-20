import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  // Render children if authenticated
  return children;
};

export default PrivateRoute;
