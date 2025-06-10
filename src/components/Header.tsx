
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { User, LogOut } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-card px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 sm:gap-4">
        <SidebarTrigger className="w-6 h-6 sm:w-8 sm:h-8" />
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs sm:text-sm">A</span>
          </div>
          <h1 className="text-base sm:text-xl font-bold text-primary">AUTONOM</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:flex items-center gap-2">
          <User className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm font-medium">{user?.name}</span>
          <span className="text-xs text-muted-foreground capitalize">({user?.role})</span>
        </div>
        <div className="block sm:hidden">
          <span className="text-xs font-medium">{user?.name}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:px-3 sm:py-2"
        >
          <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Ieșire</span>
        </Button>
      </div>
    </header>
  );
};
