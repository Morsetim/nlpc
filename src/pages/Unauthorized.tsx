
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';

const Unauthorized = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
        <ShieldAlert className="h-10 w-10 text-destructive" />
      </div>
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        You don't have permission to access this page. 
        {user && <span> Your current role is <span className="font-medium">{user.role}</span>.</span>}
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate('/dashboard')} className="flex items-center">
          <Home className="mr-2 h-4 w-4" />
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
