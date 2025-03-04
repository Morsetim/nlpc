
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
import { ArrowLeft, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    
    if (isEmailValid) {
      setIsSubmitting(true);
      try {
        await resetPassword(email);
        setIsSubmitted(true);
      } catch (error) {
        console.error('Password reset failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className='w-full flex h-screen justify-center items-center'>
        <Card className="w-full max-w-md shadow-lg bg-white/90 backdrop-blur-sm animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">Check Your Email</CardTitle>
            <CardDescription className="text-center">
              We've sent password reset instructions to <span className="font-medium">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <p className="text-center text-muted-foreground mb-6">
              Please check your email for instructions on how to reset your password. If you don't see it, check your spam folder.
            </p>
            <Button 
              className="w-full hover-scale"
              onClick={() => setIsSubmitted(false)}
            >
              Back to Reset Password
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" asChild>
              <Link to="/login" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className='w-full flex h-screen justify-center items-center'>
      <Card className="w-full max-w-md shadow-lg bg-white/90 backdrop-blur-sm animate-fade-in">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold text-center">Forgot your password?</CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you instructions to reset your password.
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
                />
              </div>
              {emailError && (
                <p className="text-destructive text-sm flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {emailError}
                </p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full font-medium hover-scale"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
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
                  Sending...
                </span>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <Link to="/login" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
