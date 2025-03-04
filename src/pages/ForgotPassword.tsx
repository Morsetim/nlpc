
import React from 'react';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-accent p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Pension Portal</h1>
        <p className="text-muted-foreground">Reset your password</p>
      </div>
      <ForgotPasswordForm />
      <div className="mt-8 text-sm text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Pension Management System. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
