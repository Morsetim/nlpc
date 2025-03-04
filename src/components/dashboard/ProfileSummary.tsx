
import React from 'react';
import { usePension } from '@/contexts/PensionContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPhoneNumber, calculateAge } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileSummary: React.FC = () => {
  const { profile, isLoading } = usePension();
  const navigate = useNavigate();

  if (isLoading.profile) {
    return (
      <Card className="animate-pulse">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Profile Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="h-24 w-24 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-2">
              <div className="h-6 w-2/3 rounded bg-gray-200"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
              <div className="h-4 w-3/4 rounded bg-gray-200"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Profile Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground">No profile information available</p>
            <Button 
              variant="link" 
              onClick={() => navigate('/profile')}
              className="mt-2"
            >
              Setup your profile
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Profile Summary</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => navigate('/profile')} className="h-8">
          <span className="mr-1">View Profile</span>
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0">
            <img
              src={profile.passportPhoto}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="h-24 w-24 rounded-full object-cover border"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium">
              {profile.firstName} {profile.lastName}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Age:</span>{' '}
                {calculateAge(profile.dateOfBirth)} years
              </div>
              <div>
                <span className="text-muted-foreground">Employer:</span>{' '}
                {profile.employerName}
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>{' '}
                {profile.email}
              </div>
              <div>
                <span className="text-muted-foreground">Phone:</span>{' '}
                {formatPhoneNumber(profile.phone)}
              </div>
              <div className="md:col-span-2">
                <span className="text-muted-foreground">Next of Kin:</span>{' '}
                {profile.nextOfKin.name} ({profile.nextOfKin.relationship})
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSummary;
