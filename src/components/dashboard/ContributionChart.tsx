
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { usePension, Contribution } from '@/contexts/PensionContext';
import { formatCurrency } from '@/lib/formatters';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type TimeRange = '6months' | '1year' | 'all';

const ContributionChart: React.FC = () => {
  const { contributions } = usePension();
  const [timeRange, setTimeRange] = useState<TimeRange>('6months');
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (contributions.length === 0) return;

    // Sort contributions by date
    const sortedContributions = [...contributions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Filter based on time range
    const now = new Date();
    let filteredContributions = sortedContributions;

    if (timeRange === '6months') {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      filteredContributions = sortedContributions.filter(
        (c) => new Date(c.date) >= sixMonthsAgo
      );
    } else if (timeRange === '1year') {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      filteredContributions = sortedContributions.filter(
        (c) => new Date(c.date) >= oneYearAgo
      );
    }

    // Group by month
    const groupedByMonth: Record<string, { mandatory: number; voluntary: number }> = {};

    filteredContributions.forEach((contribution) => {
      const date = new Date(contribution.date);
      const month = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      if (!groupedByMonth[month]) {
        groupedByMonth[month] = { mandatory: 0, voluntary: 0 };
      }

      if (contribution.type === 'mandatory') {
        groupedByMonth[month].mandatory += contribution.amount;
      } else {
        groupedByMonth[month].voluntary += contribution.amount;
      }
    });

    // Convert to chart data format
    const data = Object.entries(groupedByMonth).map(([month, values]) => ({
      month,
      mandatory: values.mandatory,
      voluntary: values.voluntary,
      total: values.mandatory + values.voluntary,
    }));

    setChartData(data);
  }, [contributions, timeRange]);

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow p-3">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            <span className="inline-block w-3 h-3 bg-primary rounded-full mr-2"></span>
            Mandatory: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm">
            <span className="inline-block w-3 h-3 bg-accent-foreground rounded-full mr-2"></span>
            Voluntary: {formatCurrency(payload[1].value)}
          </p>
          <p className="text-sm font-medium mt-1">
            Total: {formatCurrency(payload[2].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-3 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-lg font-medium">Contribution Trends</CardTitle>
            <CardDescription>
              Overview of your mandatory and voluntary contributions
            </CardDescription>
          </div>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => value && setTimeRange(value as TimeRange)}
            className="justify-start"
          >
            <ToggleGroupItem value="6months" aria-label="6 months">
              6 Months
            </ToggleGroupItem>
            <ToggleGroupItem value="1year" aria-label="1 year">
              1 Year
            </ToggleGroupItem>
            <ToggleGroupItem value="all" aria-label="All time">
              All
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-4">
          {chartData.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No contribution data available</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis
                  tickFormatter={(value) => `₦${value / 1000}k`}
                  width={80}
                />
                <Tooltip content={customTooltip} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  formatter={(value) => <span className="capitalize">{value}</span>}
                />
                <Bar
                  dataKey="mandatory"
                  name="Mandatory"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                <Bar
                  dataKey="voluntary"
                  name="Voluntary"
                  fill="hsl(var(--accent-foreground))"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                <Bar
                  dataKey="total"
                  name="Total"
                  fill="transparent"
                  stroke="none"
                  radius={[4, 4, 0, 0]}
                  barSize={0}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContributionChart;
