export interface Customer {
    id: string;
    name: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    phoneNumber: string;
    address: string;
    pensionId: string;
    photo: string;
    role: 'admin' | 'member';
    joinDate: string;
    accountStatus: 'active' | 'inactive' | 'pending';
    employer: Employer;
    nextOfKin: NextOfKin;
  }
  
  export interface Employer {
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    industry: string;
    joinDate: string;
  }
  
  export interface NextOfKin {
    name: string;
    relationship: string;
    phoneNumber: string;
    email: string;
    address: string;
  }
  
  export interface Contribution {
    id: string;
    date: string;
    amount: number;
    type: 'employer' | 'employee' | 'voluntary';
    status: 'processed' | 'pending' | 'failed';
    description: string;
    employerId: string;
  }
  
  export interface Statement {
    id: string;
    customerId: string;
    period: string;
    generatedDate: string;
    totalContributions: number;
    totalEarnings: number;
    currentBalance: number;
    status: 'generated' | 'pending' | 'failed';
    contributions: Contribution[];
  }
  
  // Mock data for the customer
  export const mockCustomer: Customer = {
    id: "CUST001",
    name: "John Member",
    email: "member@pension.com",
    dateOfBirth: "1980-05-15",
    gender: "Male",
    phoneNumber: "+1234567890",
    address: "123 Main Street, Cityville, State 12345",
    pensionId: "PEN20231234",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
    role: "member",
    joinDate: "2020-03-10",
    accountStatus: "active",
    employer: {
      id: "EMP001",
      name: "TechCorp International",
      address: "456 Tech Park, Innovation City, State 54321",
      phoneNumber: "+9876543210",
      email: "hr@techcorp.com",
      industry: "Information Technology",
      joinDate: "2020-03-10"
    },
    nextOfKin: {
      name: "Jane Member",
      relationship: "Spouse",
      phoneNumber: "+1234567891",
      email: "jane@example.com",
      address: "123 Main Street, Cityville, State 12345"
    }
  };
  
  // Mock data for contributions
  export const mockContributions: Contribution[] = [
    {
      id: "CON001",
      date: "2023-11-15",
      amount: 500.00,
      type: "employer",
      status: "processed",
      description: "Monthly Employer Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON002",
      date: "2023-11-15",
      amount: 250.00,
      type: "employee",
      status: "processed",
      description: "Monthly Employee Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON003",
      date: "2023-10-15",
      amount: 500.00,
      type: "employer",
      status: "processed",
      description: "Monthly Employer Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON004",
      date: "2023-10-15",
      amount: 250.00,
      type: "employee",
      status: "processed",
      description: "Monthly Employee Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON005",
      date: "2023-09-15",
      amount: 500.00,
      type: "employer",
      status: "processed",
      description: "Monthly Employer Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON006",
      date: "2023-09-15",
      amount: 250.00,
      type: "employee",
      status: "processed",
      description: "Monthly Employee Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON007",
      date: "2023-08-15",
      amount: 500.00,
      type: "employer",
      status: "processed",
      description: "Monthly Employer Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON008",
      date: "2023-08-15",
      amount: 250.00,
      type: "employee",
      status: "processed",
      description: "Monthly Employee Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON009",
      date: "2023-07-15",
      amount: 500.00,
      type: "employer",
      status: "processed",
      description: "Monthly Employer Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON010",
      date: "2023-07-15",
      amount: 250.00,
      type: "employee",
      status: "processed",
      description: "Monthly Employee Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON011",
      date: "2023-06-15",
      amount: 500.00,
      type: "employer",
      status: "processed",
      description: "Monthly Employer Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON012",
      date: "2023-06-15",
      amount: 250.00,
      type: "employee",
      status: "processed",
      description: "Monthly Employee Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON013",
      date: "2023-05-15",
      amount: 400.00,
      type: "employer",
      status: "processed",
      description: "Monthly Employer Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON014",
      date: "2023-05-15",
      amount: 200.00,
      type: "employee",
      status: "processed",
      description: "Monthly Employee Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON015",
      date: "2023-04-15",
      amount: 400.00,
      type: "employer",
      status: "processed",
      description: "Monthly Employer Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON016",
      date: "2023-04-15",
      amount: 200.00,
      type: "employee",
      status: "processed",
      description: "Monthly Employee Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON017",
      date: "2023-03-15",
      amount: 400.00,
      type: "employer",
      status: "processed",
      description: "Monthly Employer Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON018",
      date: "2023-03-15",
      amount: 200.00,
      type: "employee",
      status: "processed",
      description: "Monthly Employee Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON019",
      date: "2023-02-15",
      amount: 400.00,
      type: "employer",
      status: "processed",
      description: "Monthly Employer Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON020",
      date: "2023-02-15",
      amount: 200.00,
      type: "employee",
      status: "processed",
      description: "Monthly Employee Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON021",
      date: "2023-01-15",
      amount: 400.00,
      type: "employer",
      status: "processed",
      description: "Monthly Employer Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON022",
      date: "2023-01-15",
      amount: 200.00,
      type: "employee",
      status: "processed",
      description: "Monthly Employee Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON023",
      date: "2022-12-15",
      amount: 400.00,
      type: "employer",
      status: "processed",
      description: "Monthly Employer Contribution",
      employerId: "EMP001"
    },
    {
      id: "CON024",
      date: "2022-12-15",
      amount: 200.00,
      type: "employee",
      status: "processed",
      description: "Monthly Employee Contribution",
      employerId: "EMP001"
    }
  ];
  
  // Mock data for statements
  export const mockStatements: Statement[] = [
    {
      id: "STMT001",
      customerId: "CUST001",
      period: "2023-Q4",
      generatedDate: "2023-12-31",
      totalContributions: 1500.00,
      totalEarnings: 75.00,
      currentBalance: 11575.00,
      status: "generated",
      contributions: mockContributions.slice(0, 6)
    },
    {
      id: "STMT002",
      customerId: "CUST001",
      period: "2023-Q3",
      generatedDate: "2023-09-30",
      totalContributions: 1500.00,
      totalEarnings: 62.50,
      currentBalance: 10000.00,
      status: "generated",
      contributions: mockContributions.slice(6, 12)
    },
    {
      id: "STMT003",
      customerId: "CUST001",
      period: "2023-Q2",
      generatedDate: "2023-06-30",
      totalContributions: 1200.00,
      totalEarnings: 43.75,
      currentBalance: 8437.50,
      status: "generated",
      contributions: mockContributions.slice(12, 18)
    },
    {
      id: "STMT004",
      customerId: "CUST001",
      period: "2023-Q1",
      generatedDate: "2023-03-31",
      totalContributions: 1200.00,
      totalEarnings: 37.50,
      currentBalance: 7193.75,
      status: "generated",
      contributions: mockContributions.slice(18, 24)
    }
  ];
  
  // Aggregate monthly contribution data for charts
  export interface MonthlyContributionData {
    month: string;
    employer: number;
    employee: number;
    voluntary: number;
    total: number;
  }
  
  export const generateMonthlyContributionData = (): MonthlyContributionData[] => {
    const data: MonthlyContributionData[] = [];
    
    // Group contributions by month
    const contributionsByMonth = new Map<string, Contribution[]>();
    
    mockContributions.forEach(contribution => {
      const date = new Date(contribution.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!contributionsByMonth.has(monthKey)) {
        contributionsByMonth.set(monthKey, []);
      }
      
      contributionsByMonth.get(monthKey)?.push(contribution);
    });
    
    // Sort months chronologically
    const sortedMonths = Array.from(contributionsByMonth.keys()).sort();
    
    // Create data for each month
    sortedMonths.forEach(monthKey => {
      const [year, month] = monthKey.split('-').map(Number);
      const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'short' });
      const displayName = `${monthName} ${year}`;
      
      const monthContributions = contributionsByMonth.get(monthKey) || [];
      
      const employer = monthContributions
        .filter(c => c.type === 'employer')
        .reduce((sum, c) => sum + c.amount, 0);
        
      const employee = monthContributions
        .filter(c => c.type === 'employee')
        .reduce((sum, c) => sum + c.amount, 0);
        
      const voluntary = monthContributions
        .filter(c => c.type === 'voluntary')
        .reduce((sum, c) => sum + c.amount, 0);
        
      const total = employer + employee + voluntary;
      
      data.push({
        month: displayName,
        employer,
        employee,
        voluntary,
        total
      });
    });
    
    return data;
  };
  
  export const monthlyContributionData = generateMonthlyContributionData();
  
  // Cumulative balance data for charts
  export interface CumulativeBalanceData {
    month: string;
    contributions: number;
    earnings: number;
    balance: number;
  }
  
  // Generate cumulative balance data
  export const generateCumulativeBalanceData = (): CumulativeBalanceData[] => {
    const data: CumulativeBalanceData[] = [];
    let runningBalance = 0;
    
    monthlyContributionData.forEach((monthData, index) => {
      // Simulate some earnings (just for demo purposes)
      const earnings = runningBalance * 0.005; // 0.5% monthly return
      
      runningBalance += monthData.total + earnings;
      
      data.push({
        month: monthData.month,
        contributions: monthData.total,
        earnings: Math.round(earnings * 100) / 100,
        balance: Math.round(runningBalance * 100) / 100
      });
    });
    
    return data;
  };
  
  export const cumulativeBalanceData = generateCumulativeBalanceData();
  