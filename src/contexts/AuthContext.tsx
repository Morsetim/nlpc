
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from "sonner";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'RESET_ERROR' };

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

// Initial State
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        isLoading: false, 
        isAuthenticated: true, 
        user: action.payload, 
        error: null 
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        isLoading: false, 
        isAuthenticated: false, 
        error: action.payload 
      };
    case 'LOGOUT':
      return { 
        ...initialState,
        isAuthenticated: false, 
      };
    case 'RESET_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for stored session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (email === 'admin@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          avatarUrl: 'https://i.pravatar.cc/150?u=admin'
        };
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        toast.success("Login successful");
        return;
      }
      
      if (email === 'member@example.com' && password === 'password') {
        const user: User = {
          id: '2',
          name: 'John Doe',
          email: 'member@example.com',
          role: 'member',
          avatarUrl: 'https://i.pravatar.cc/150?u=member'
        };
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        toast.success("Login successful");
        return;
      }
      
      // Invalid credentials
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: 'Invalid email or password' 
      });
      toast.error("Invalid email or password");
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: 'An error occurred. Please try again.' 
      });
      toast.error("An error occurred. Please try again.");
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    toast.info("You have been logged out");
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(`Password reset instructions sent to ${email}`);
  };

  const value = {
    ...state,
    login,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
