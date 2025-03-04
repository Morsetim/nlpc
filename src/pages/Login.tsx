
import React, { useEffect } from 'react';
import LoginForm from '@/components/auth/LoginForm';

import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-accent p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">NLPC Pension Portal</h1>
        <p className="text-muted-foreground">Secure access to your pension information</p>
      </div>
      <LoginForm />
      <div className="mt-8 text-sm text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} NLPC Pension Management System. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
