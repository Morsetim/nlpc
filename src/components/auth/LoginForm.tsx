
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { CheckCircle, Lock, Mail, AlertCircle } from 'lucide-react';

const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (isEmailValid && isPasswordValid) {
      await login(email, password);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg bg-white/90 backdrop-blur-sm animate-fade-in">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-semibold text-center">Sign in to your account</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to access your pension dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`pl-10 ${emailError ? 'border-destructive' : ''}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) validateEmail(e.target.value);
                }}
                autoComplete="email"
              />
            </div>
            {emailError && (
              <p className="text-destructive text-sm flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {emailError}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Button 
                variant="link" 
                className="text-xs font-medium text-primary p-0 h-auto"
                type="button"
                onClick={() => window.location.href = '/forgot-password'}
              >
                Forgot password?
              </Button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                className={`pl-10 ${passwordError ? 'border-destructive' : ''}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) validatePassword(e.target.value);
                }}
                autoComplete="current-password"
              />
            </div>
            {passwordError && (
              <p className="text-destructive text-sm flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {passwordError}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="remember" 
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="remember" className="text-sm text-muted-foreground">Remember me</Label>
          </div>
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          <Button 
            type="submit" 
            className="w-full font-medium hover-scale"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg 
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  ></circle>
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Demo Accounts</span>
          </div>
        </div>
        <div className="grid gap-2">
          <Button 
            variant="outline" 
            className="bg-secondary/50 border-0 hover:bg-secondary"
            onClick={() => {
              setEmail('member@example.com');
              setPassword('password');
            }}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Member Login (member@example.com / password)
          </Button>
          <Button 
            variant="outline" 
            className="bg-secondary/50 border-0 hover:bg-secondary"
            onClick={() => {
              setEmail('admin@example.com');
              setPassword('password');
            }}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Admin Login (admin@example.com / password)
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
