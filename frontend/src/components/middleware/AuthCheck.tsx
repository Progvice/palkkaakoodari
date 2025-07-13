import React from 'react';
import { useAuth } from '../../context/auth.context'; // Assuming this is where you're getting the auth context
import { Navigate } from 'react-router-dom';

// This is the Higher-Order Component (HOC)
const withAuthCheck = (PageComponent: React.ComponentType) => {
  const AuthCheckWrapper: React.FC = () => {
    const auth = useAuth();
    const isAuthenticated = auth?.token !== null;

    // If authenticated, render the PageComponent
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ requireLogin: true }} />;
    }

    // If not authenticated, navigate to login
    return <PageComponent />
  };

  return <AuthCheckWrapper/>;
};

export default withAuthCheck;
