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
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };
  
  // Calculate total balance
  const totalBalance = cumulativeBalanceData.length > 0 
    ? cumulativeBalanceData[cumulativeBalanceData.length - 1].balance 
    : 0;
  
  // Calculate total contributions
  const totalContributions = mockContributions.reduce((sum, contrib) => sum + contrib.amount, 0);
  
  // Calculate average monthly contribution
  const averageMonthlyContribution = monthlyContributionData.length > 0
    ? monthlyContributionData.reduce((sum, month) => sum + month.total, 0) / monthlyContributionData.length
    : 0;
    
  // Get latest contributions
  const latestContributions = [...mockContributions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-border shadow-md rounded-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleLogout = () => { 
    logout();
    navigate("/login");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className='flex gap-x-4 items-center md:mr-4'>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className='md-text-md text-sm font-serif font-semibold cursor-pointer' onClick={handleLogout}>Logout</p>
        </div>
      </div>
      
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Balance</p>
                <p className="text-2xl font-bold">{formatCurrency(totalBalance)}</p>
              </div>
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <DollarSign size={20} />
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground flex items-center">
              <TrendingUp size={14} className="mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+2.5%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Contributions</p>
                <p className="text-2xl font-bold">{formatCurrency(totalContributions)}</p>
              </div>
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Activity size={20} />
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>Since {mockCustomer.joinDate}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Monthly Average</p>
                <p className="text-2xl font-bold">{formatCurrency(averageMonthlyContribution)}</p>
              </div>
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <ArrowUpRight size={20} />
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground flex items-center">
              <span>Calculated from {monthlyContributionData.length} months</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Account Status</p>
                <p className="text-2xl font-bold capitalize">{mockCustomer.accountStatus}</p>
              </div>
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Users size={20} />
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground flex items-center">
              <span>Member since {new Date(mockCustomer.joinDate).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader>
            <CardTitle>Pension Growth</CardTitle> 
            <CardDescription>Your pension balance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={cumulativeBalanceData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }} 
                    tickMargin={10}
                    axisLine={{ opacity: 0.3 }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${value}`}
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                    axisLine={{ opacity: 0.3 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fill="url(#balanceGradient)" 
                    name="Balance"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader>
            <CardTitle>Contribution Breakdown</CardTitle>
            <CardDescription>Employer vs. employee contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyContributionData.slice(-6)} // Just show last 6 months
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }} 
                    tickMargin={10}
                    axisLine={{ opacity: 0.3 }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${value}`}
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                    axisLine={{ opacity: 0.3 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="employer" 
                    name="Employer" 
                    stackId="a" 
                    fill="hsl(var(--primary))" 
                  />
                  <Bar 
                    dataKey="employee" 
                    name="Employee" 
                    stackId="a" 
                    fill="rgba(var(--primary), 0.5)" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Contributions & User Profile */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        {/* User Profile Summary */}
        <Card className="shadow-sm hover:shadow transition-shadow lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Member Profile</CardTitle>
            <CardDescription>Your pension account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center pt-4 pb-6">
              <Avatar className="h-24 w-24 border-4 border-primary/10">
                <AvatarImage src={mockCustomer.photo} alt={mockCustomer.name} />
                <AvatarFallback>{mockCustomer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-xl font-semibold">{mockCustomer.name}</h3>
              <p className="text-sm text-muted-foreground">Pension ID: {mockCustomer.pensionId}</p>
              
              <div className="w-full mt-6 space-y-4">
                <div className="w-full">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Personal Info</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Email:</div>
                    <div className="font-medium text-right">{mockCustomer.email}</div>
                    <div className="text-muted-foreground">Phone:</div>
                    <div className="font-medium text-right">{mockCustomer.phoneNumber}</div>
                    <div className="text-muted-foreground">DOB:</div>
                    <div className="font-medium text-right">{new Date(mockCustomer.dateOfBirth).toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div className="w-full">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Employer</h4>
                  <div className="text-sm">
                    <div className="font-medium">{mockCustomer.employer.name}</div>
                    <div className="text-muted-foreground">{mockCustomer.employer.industry}</div>
                  </div>
                </div>
              </div>
              
              <Button 
                className="mt-6 w-full" 
                variant="outline"
                onClick={() => navigate('/profile')}
              >
                View Full Profile
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Contributions */}
        <Card className="shadow-sm hover:shadow transition-shadow lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Contributions</CardTitle>
                <CardDescription>Your last 5 pension contributions</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/contributions')}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {latestContributions.map((contribution) => (
                <div 
                  key={contribution.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      contribution.type === 'employer' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-primary/5 text-primary/80'
                    }`}>
                      {contribution.type === 'employer' ? <DollarSign size={16} /> : <Users size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{contribution.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(contribution.date).toLocaleDateString()} • {contribution.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(contribution.amount)}</p>
                    <p className={`text-xs ${
                      contribution.status === 'processed' 
                        ? 'text-green-500' 
                        : contribution.status === 'pending' 
                          ? 'text-amber-500' 
                          : 'text-red-500'
                    }`}>
                      {contribution.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common actions for your pension account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto flex flex-col items-center justify-center p-4 btn-hover"
              onClick={() => navigate('/statements')}
            >
              <FileText className="h-6 w-6 mb-2" />
              <span>View Statements</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto flex flex-col items-center justify-center p-4 btn-hover"
              onClick={() => navigate('/contributions')}
            >
              <Activity className="h-6 w-6 mb-2" />
              <span>Analyze Contributions</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto flex flex-col items-center justify-center p-4 btn-hover"
              onClick={() => navigate('/profile')}
            >
              <Users className="h-6 w-6 mb-2" />
              <span>Update Profile</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto flex flex-col items-center justify-center p-4 btn-hover"
              onClick={() => navigate('/support')}
            >
              <Calendar className="h-6 w-6 mb-2" />
              <span>Contact Support</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;