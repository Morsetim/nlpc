
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from "sonner";
import { formatCurrency } from '@/lib/formatters';

// Types
export interface MemberProfile {
  id: string;
  passportPhoto: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  employerName: string;
  employerId: string;
  employerAddress: string;
  employmentDate: string;
  nextOfKin: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
    address: string;
  };
}

export interface Contribution {
  id: string;
  date: string;
  amount: number;
  type: 'mandatory' | 'voluntary';
  status: 'pending' | 'processed' | 'failed';
  description?: string;
  employerContribution?: number;
  employeeContribution?: number;
}

export interface Statement {
  id: string;
  startDate: string;
  endDate: string;
  contributions: Contribution[];
  openingBalance: number;
  closingBalance: number;
  totalContributions: number;
  earnings: number;
  fees: number;
  generatedDate: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface PensionState {
  profile: MemberProfile | null;
  contributions: Contribution[];
  statements: Statement[];
  notifications: Notification[];
  isLoading: {
    profile: boolean;
    contributions: boolean;
    statements: boolean;
    notifications: boolean;
  };
  error: string | null;
}

type PensionAction = 
  | { type: 'FETCH_PROFILE_START' }
  | { type: 'FETCH_PROFILE_SUCCESS'; payload: MemberProfile }
  | { type: 'FETCH_PROFILE_FAILURE'; payload: string }
  | { type: 'FETCH_CONTRIBUTIONS_START' }
  | { type: 'FETCH_CONTRIBUTIONS_SUCCESS'; payload: Contribution[] }
  | { type: 'FETCH_CONTRIBUTIONS_FAILURE'; payload: string }
  | { type: 'ADD_CONTRIBUTION_SUCCESS'; payload: Contribution }
  | { type: 'FETCH_STATEMENTS_START' }
  | { type: 'FETCH_STATEMENTS_SUCCESS'; payload: Statement[] }
  | { type: 'FETCH_STATEMENTS_FAILURE'; payload: string }
  | { type: 'GENERATE_STATEMENT_SUCCESS'; payload: Statement }
  | { type: 'FETCH_NOTIFICATIONS_START' }
  | { type: 'FETCH_NOTIFICATIONS_SUCCESS'; payload: Notification[] }
  | { type: 'FETCH_NOTIFICATIONS_FAILURE'; payload: string }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'MARK_ALL_NOTIFICATIONS_READ' };

interface PensionContextType extends PensionState {
  fetchProfile: () => Promise<void>;
  fetchContributions: () => Promise<void>;
  addContribution: (contribution: Omit<Contribution, 'id'>) => Promise<void>;
  fetchStatements: () => Promise<void>;
  generateStatement: (startDate: string, endDate: string) => Promise<Statement>;
  fetchNotifications: () => Promise<void>;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  getRecentContributions: (count: number) => Contribution[];
  getTotalContributions: () => number;
  getVoluntaryContributions: () => Contribution[];
  getMandatoryContributions: () => Contribution[];
}

// Initial State
const initialState: PensionState = {
  profile: null,
  contributions: [],
  statements: [],
  notifications: [],
  isLoading: {
    profile: false,
    contributions: false,
    statements: false,
    notifications: false
  },
  error: null
};

// Reducer
const pensionReducer = (state: PensionState, action: PensionAction): PensionState => {
  switch (action.type) {
    case 'FETCH_PROFILE_START':
      return { 
        ...state, 
        isLoading: { ...state.isLoading, profile: true }, 
        error: null 
      };
    case 'FETCH_PROFILE_SUCCESS':
      return { 
        ...state, 
        profile: action.payload, 
        isLoading: { ...state.isLoading, profile: false }
      };
    case 'FETCH_PROFILE_FAILURE':
      return { 
        ...state, 
        error: action.payload, 
        isLoading: { ...state.isLoading, profile: false }
      };
    case 'FETCH_CONTRIBUTIONS_START':
      return { 
        ...state, 
        isLoading: { ...state.isLoading, contributions: true }, 
        error: null 
      };
    case 'FETCH_CONTRIBUTIONS_SUCCESS':
      return { 
        ...state, 
        contributions: action.payload, 
        isLoading: { ...state.isLoading, contributions: false }
      };
    case 'FETCH_CONTRIBUTIONS_FAILURE':
      return { 
        ...state, 
        error: action.payload, 
        isLoading: { ...state.isLoading, contributions: false }
      };
    case 'ADD_CONTRIBUTION_SUCCESS':
      return { 
        ...state, 
        contributions: [action.payload, ...state.contributions]
      };
    case 'FETCH_STATEMENTS_START':
      return { 
        ...state, 
        isLoading: { ...state.isLoading, statements: true }, 
        error: null 
      };
    case 'FETCH_STATEMENTS_SUCCESS':
      return { 
        ...state, 
        statements: action.payload, 
        isLoading: { ...state.isLoading, statements: false }
      };
    case 'FETCH_STATEMENTS_FAILURE':
      return { 
        ...state, 
        error: action.payload, 
        isLoading: { ...state.isLoading, statements: false }
      };
    case 'GENERATE_STATEMENT_SUCCESS':
      return { 
        ...state, 
        statements: [action.payload, ...state.statements]
      };
    case 'FETCH_NOTIFICATIONS_START':
      return { 
        ...state, 
        isLoading: { ...state.isLoading, notifications: true }, 
        error: null 
      };
    case 'FETCH_NOTIFICATIONS_SUCCESS':
      return { 
        ...state, 
        notifications: action.payload, 
        isLoading: { ...state.isLoading, notifications: false }
      };
    case 'FETCH_NOTIFICATIONS_FAILURE':
      return { 
        ...state, 
        error: action.payload, 
        isLoading: { ...state.isLoading, notifications: false }
      };
    case 'MARK_NOTIFICATION_READ':
      return { 
        ...state, 
        notifications: state.notifications.map(notification => 
          notification.id === action.payload 
            ? { ...notification, isRead: true } 
            : notification
        )
      };
    case 'MARK_ALL_NOTIFICATIONS_READ':
      return { 
        ...state, 
        notifications: state.notifications.map(notification => 
          ({ ...notification, isRead: true })
        )
      };
    default:
      return state;
  }
};

// Context
const PensionContext = createContext<PensionContextType | undefined>(undefined);

// Provider Component
export const PensionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(pensionReducer, initialState);

  // Fetch profile data
  const fetchProfile = async () => {
    dispatch({ type: 'FETCH_PROFILE_START' });
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock profile data
      const profile: MemberProfile = {
        id: '12345',
        passportPhoto: 'https://i.pravatar.cc/300?u=member',
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        dateOfBirth: '1985-05-15',
        email: 'john.doe@example.com',
        phone: '+2348012345678',
        address: '123 Main Street',
        city: 'Lagos',
        state: 'Lagos State',
        zipCode: '100001',
        employerName: 'TechCorp Nigeria Ltd',
        employerId: 'EMP-5678',
        employerAddress: '456 Business Avenue, Victoria Island, Lagos',
        employmentDate: '2015-03-10',
        nextOfKin: {
          name: 'Jane Doe',
          relationship: 'Spouse',
          phone: '+2348087654321',
          email: 'jane.doe@example.com',
          address: '123 Main Street, Lagos'
        }
      };
      
      dispatch({ type: 'FETCH_PROFILE_SUCCESS', payload: profile });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_PROFILE_FAILURE', 
        payload: 'Failed to fetch profile data' 
      });
      toast.error("Failed to fetch profile data");
    }
  };

  // Fetch contributions
  const fetchContributions = async () => {
    dispatch({ type: 'FETCH_CONTRIBUTIONS_START' });
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock contributions data
      const today = new Date();
      const contributions: Contribution[] = [];
      
      // Add 24 contributions (2 years of monthly mandatory contributions)
      for (let i = 0; i < 24; i++) {
        const date = new Date(today);
        date.setMonth(today.getMonth() - i);
        
        const mandatoryContribution: Contribution = {
          id: `mc-${i}`,
          date: date.toISOString().split('T')[0],
          amount: 50000 + Math.floor(Math.random() * 10000),
          type: 'mandatory',
          status: 'processed',
          employerContribution: 25000 + Math.floor(Math.random() * 5000),
          employeeContribution: 25000 + Math.floor(Math.random() * 5000),
        };
        
        contributions.push(mandatoryContribution);
        
        // Add some voluntary contributions randomly
        if (Math.random() > 0.7) {
          const voluntaryDate = new Date(date);
          voluntaryDate.setDate(voluntaryDate.getDate() - Math.floor(Math.random() * 15));
          
          const voluntaryContribution: Contribution = {
            id: `vc-${i}`,
            date: voluntaryDate.toISOString().split('T')[0],
            amount: 20000 + Math.floor(Math.random() * 50000),
            type: 'voluntary',
            status: 'processed',
            description: 'Additional voluntary contribution',
          };
          
          contributions.push(voluntaryContribution);
        }
      }
      
      // Sort contributions by date (newest first)
      contributions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      dispatch({ type: 'FETCH_CONTRIBUTIONS_SUCCESS', payload: contributions });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_CONTRIBUTIONS_FAILURE', 
        payload: 'Failed to fetch contributions' 
      });
      toast.error("Failed to fetch contributions");
    }
  };

  // Add a new contribution
  const addContribution = async (contributionData: Omit<Contribution, 'id'>) => {
    try {
      // Validation
      const today = new Date();
      const contributionDate = new Date(contributionData.date);
      
      // Check if date is in the future
      if (contributionDate > today) {
        toast.error("Contribution date cannot be in the future");
        return;
      }
      
      // For mandatory contributions, check if one already exists for the month
      if (contributionData.type === 'mandatory') {
        const month = contributionDate.getMonth();
        const year = contributionDate.getFullYear();
        
        const existingMandatory = state.contributions.find(contribution => {
          const contribDate = new Date(contribution.date);
          return (
            contribution.type === 'mandatory' &&
            contribDate.getMonth() === month &&
            contribDate.getFullYear() === year
          );
        });
        
        if (existingMandatory) {
          toast.error("A mandatory contribution already exists for this month");
          return;
        }
      }
      
      // Check for duplicate transactions
      const isDuplicate = state.contributions.some(contribution => 
        contribution.date === contributionData.date &&
        contribution.amount === contributionData.amount &&
        contribution.type === contributionData.type
      );
      
      if (isDuplicate) {
        toast.error("This appears to be a duplicate contribution");
        return;
      }
      
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new contribution with ID
      const newContribution: Contribution = {
        id: `contrib-${Date.now()}`,
        ...contributionData,
      };
      
      dispatch({ type: 'ADD_CONTRIBUTION_SUCCESS', payload: newContribution });
      toast.success(`${contributionData.type === 'mandatory' ? 'Mandatory' : 'Voluntary'} contribution added successfully`);
    } catch (error) {
      toast.error("Failed to add contribution");
    }
  };

  // Fetch statements
  const fetchStatements = async () => {
    dispatch({ type: 'FETCH_STATEMENTS_START' });
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock statements data
      const statements: Statement[] = [];
      const today = new Date();
      
      // Create quarterly statements for the past 2 years
      for (let i = 0; i < 8; i++) {
        const endDate = new Date(today);
        endDate.setMonth(today.getMonth() - (i * 3));
        
        const startDate = new Date(endDate);
        startDate.setMonth(endDate.getMonth() - 3);
        
        const relevantContributions = state.contributions.filter(contribution => {
          const contribDate = new Date(contribution.date);
          return contribDate >= startDate && contribDate <= endDate;
        });
        
        const totalContributions = relevantContributions.reduce((sum, contrib) => sum + contrib.amount, 0);
        const openingBalance = 1000000 + (i * 200000) + Math.floor(Math.random() * 50000);
        const earnings = totalContributions * 0.05;
        const fees = totalContributions * 0.01;
        const closingBalance = openingBalance + totalContributions + earnings - fees;
        
        const statement: Statement = {
          id: `statement-${i}`,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          contributions: relevantContributions,
          openingBalance,
          closingBalance,
          totalContributions,
          earnings,
          fees,
          generatedDate: new Date(endDate.getTime() + 86400000).toISOString().split('T')[0], // One day after end date
        };
        
        statements.push(statement);
      }
      
      dispatch({ type: 'FETCH_STATEMENTS_SUCCESS', payload: statements });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_STATEMENTS_FAILURE', 
        payload: 'Failed to fetch statements' 
      });
      toast.error("Failed to fetch statements");
    }
  };

  // Generate a new statement
  const generateStatement = async (startDate: string, endDate: string): Promise<Statement> => {
    try {
      // Validate dates
      const start = new Date(startDate);
      const end = new Date(endDate);
      const today = new Date();
      
      if (end > today) {
        throw new Error("End date cannot be in the future");
      }
      
      if (start > end) {
        throw new Error("Start date cannot be after end date");
      }
      
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filter contributions within date range
      const relevantContributions = state.contributions.filter(contribution => {
        const contribDate = new Date(contribution.date);
        return contribDate >= start && contribDate <= end;
      });
      
      if (relevantContributions.length === 0) {
        throw new Error("No contributions found within selected date range");
      }
      
      // Calculate statement data
      const totalContributions = relevantContributions.reduce((sum, contrib) => sum + contrib.amount, 0);
      const openingBalance = 1000000 + Math.floor(Math.random() * 50000);
      const earnings = totalContributions * 0.05;
      const fees = totalContributions * 0.01;
      const closingBalance = openingBalance + totalContributions + earnings - fees;
      
      const statement: Statement = {
        id: `statement-${Date.now()}`,
        startDate,
        endDate,
        contributions: relevantContributions,
        openingBalance,
        closingBalance,
        totalContributions,
        earnings,
        fees,
        generatedDate: today.toISOString().split('T')[0],
      };
      
      dispatch({ type: 'GENERATE_STATEMENT_SUCCESS', payload: statement });
      toast.success("Statement generated successfully");
      return statement;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to generate statement");
      }
      throw error;
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    dispatch({ type: 'FETCH_NOTIFICATIONS_START' });
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock notifications
      const notifications: Notification[] = [
        {
          id: 'notif-1',
          title: 'Contribution Processed',
          message: 'Your recent contribution of ₦45,000 has been processed successfully.',
          date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          isRead: false,
          type: 'success'
        },
        {
          id: 'notif-2',
          title: 'Quarterly Statement Available',
          message: 'Your quarterly pension statement is now available. Click to view.',
          date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          isRead: false,
          type: 'info'
        },
        {
          id: 'notif-3',
          title: 'Profile Updated',
          message: 'Your profile information has been updated successfully.',
          date: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
          isRead: true,
          type: 'info'
        },
        {
          id: 'notif-4',
          title: 'Password Changed',
          message: 'Your account password was changed. If you did not make this change, please contact support.',
          date: new Date(Date.now() - 864000000).toISOString(), // 10 days ago
          isRead: true,
          type: 'warning'
        },
        {
          id: 'notif-5',
          title: 'Investment Performance Update',
          message: 'Your pension fund grew by 5.2% in the last quarter, outperforming the market average.',
          date: new Date(Date.now() - 2592000000).toISOString(), // 30 days ago
          isRead: true,
          type: 'info'
        }
      ];
      
      dispatch({ type: 'FETCH_NOTIFICATIONS_SUCCESS', payload: notifications });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_NOTIFICATIONS_FAILURE', 
        payload: 'Failed to fetch notifications' 
      });
      toast.error("Failed to fetch notifications");
    }
  };

  // Mark notification as read
  const markNotificationAsRead = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    dispatch({ type: 'MARK_ALL_NOTIFICATIONS_READ' });
    toast.info("All notifications marked as read");
  };

  // Utility functions
  const getRecentContributions = (count: number): Contribution[] => {
    return state.contributions.slice(0, count);
  };

  const getTotalContributions = (): number => {
    return state.contributions.reduce((sum, contrib) => sum + contrib.amount, 0);
  };

  const getVoluntaryContributions = (): Contribution[] => {
    return state.contributions.filter(contrib => contrib.type === 'voluntary');
  };

  const getMandatoryContributions = (): Contribution[] => {
    return state.contributions.filter(contrib => contrib.type === 'mandatory');
  };

  const value = {
    ...state,
    fetchProfile,
    fetchContributions,
    addContribution,
    fetchStatements,
    generateStatement,
    fetchNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    getRecentContributions,
    getTotalContributions,
    getVoluntaryContributions,
    getMandatoryContributions
  };

  return (
    <PensionContext.Provider value={value}>
      {children}
    </PensionContext.Provider>
  );
};

// Custom hook
export const usePension = (): PensionContextType => {
  const context = useContext(PensionContext);
  if (context === undefined) {
    throw new Error('usePension must be used within a PensionProvider');
  }
  return context;
};
