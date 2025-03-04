
import React from 'react';
import { usePension, Contribution } from '@/contexts/PensionContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/formatters';

const RecentContributions: React.FC = () => {
  const { getRecentContributions } = usePension();
  const recentContributions = getRecentContributions(5);

  const getBadgeVariant = (status: Contribution['status']) => {
    switch (status) {
      case 'processed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Recent Contributions</CardTitle>
      </CardHeader>
      <CardContent>
        {recentContributions.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No recent contributions found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentContributions.map((contribution) => (
              <div
                key={contribution.id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="capitalize">
                      {contribution.type}
                    </Badge>
                    <Badge
                      variant={getBadgeVariant(contribution.status) as any}
                      className="capitalize"
                    >
                      {contribution.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(contribution.date)}
                  </p>
                </div>
                <div className="font-medium">
                  {formatCurrency(contribution.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentContributions;
