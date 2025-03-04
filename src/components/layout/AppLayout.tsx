
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePension } from '@/contexts/PensionContext';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Home,
  LogOut,
  Menu,
  Moon,
  PieChart,
  Settings,
  Sun,
  User,
  X,
  Bell,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

const AppLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, fetchNotifications } = usePension();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Close sidebar when route changes on mobile
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  useEffect(() => {
    // Fetch notifications when layout mounts
    fetchNotifications();
  }, [fetchNotifications]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const unreadNotifications = notifications.filter(n => !n.isRead);

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b bg-background/90 backdrop-blur-sm">
        <div className="flex h-14 items-center px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-2 md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="flex items-center gap-2 font-semibold">
            <PieChart className="h-5 w-5 text-primary" />
            <span className="hidden md:inline-block">Pension Portal</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {unreadNotifications.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  {unreadNotifications.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllNotificationsAsRead}
                      className="h-8 text-xs"
                    >
                      Mark all read
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto py-1">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                      No notifications
                    </div>
                  ) : (
                    notifications.slice(0, 5).map((notification) => (
                      <DropdownMenuItem 
                        key={notification.id}
                        onSelect={() => markNotificationAsRead(notification.id)}
                        className={`flex flex-col items-start gap-1 p-3 ${!notification.isRead ? 'bg-accent' : ''}`}
                      >
                        <div className="flex w-full justify-between">
                          <span className="font-medium">{notification.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(notification.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        {!notification.isRead && (
                          <Badge variant="secondary" className="mt-1">New</Badge>
                        )}
                      </DropdownMenuItem>
                    ))
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-primary" onSelect={() => navigate('/notifications')}>
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                  aria-label="User menu"
                >
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.name}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-20 w-64 transform border-r bg-background transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
        >
          <div className="flex h-14 items-center border-b px-4">
            <div className="flex items-center gap-2 font-semibold">
              <PieChart className="h-5 w-5 text-primary" />
              <span>Pension Portal</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
              className="ml-auto md:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          <nav className="px-2 py-4">
            <div className="space-y-1">
              <Button
                variant={location.pathname === '/dashboard' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => navigate('/dashboard')}
              >
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
              <Button
                variant={location.pathname === '/contributions' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => navigate('/contributions')}
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                Contributions
              </Button>
              <Button
                variant={location.pathname === '/statements' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => navigate('/statements')}
              >
                <PieChart className="mr-2 h-5 w-5" />
                Statements
              </Button>
              <Button
                variant={location.pathname === '/profile' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => navigate('/profile')}
              >
                <User className="mr-2 h-5 w-5" />
                Profile
              </Button>
              {user?.role === 'admin' && (
                <Button
                  variant={location.pathname === '/settings' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Button>
              )}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out">
          {/* Backdrop for mobile */}
          {isSidebarOpen && isMobile && (
            <div
              className="fixed inset-0 z-10 bg-black/50 transition-opacity duration-300 ease-in-out md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          <div className="container py-6 md:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
