import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Activity, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Calendar,
  ArrowUpRight,
  FileText,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockCustomer, mockContributions, monthlyContributionData, cumulativeBalanceData } from '@/data/mockData'; 
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth()
  // Format currency
  // 

  const handleLogout = () => { 
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className='flex gap-x-4 items-center md:mr-4'>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className='md-text-md text-sm font-serif font-semibold cursor-pointer' onClick={handleLogout}>Logout</p>
        </div>
      </div>
  );
};

export default Dashboard;