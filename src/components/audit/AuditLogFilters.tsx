
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Download } from 'lucide-react';

interface AuditLogFiltersProps {
  searchTerm: string;
  userTypeFilter: string;
  actionFilter: string;
  onSearchChange: (value: string) => void;
  onUserTypeChange: (value: string) => void;
  onActionChange: (value: string) => void;
  onExport: () => void;
}

export const AuditLogFilters: React.FC<AuditLogFiltersProps> = ({
  searchTerm,
  userTypeFilter,
  actionFilter,
  onSearchChange,
  onUserTypeChange,
  onActionChange,
  onExport
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Label htmlFor="search">Căutare</Label>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Căutare după utilizator, resursă sau detalii..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="w-full sm:w-48">
        <Label htmlFor="userType">Tip Utilizator</Label>
        <Select value={userTypeFilter} onValueChange={onUserTypeChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toți</SelectItem>
            <SelectItem value="operator">Operator</SelectItem>
            <SelectItem value="client">Client</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-48">
        <Label htmlFor="action">Acțiune</Label>
        <Select value={actionFilter} onValueChange={onActionChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate</SelectItem>
            <SelectItem value="CREATE">Creare</SelectItem>
            <SelectItem value="UPDATE">Actualizare</SelectItem>
            <SelectItem value="DELETE">Ștergere</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end">
        <Button 
          variant="outline" 
          onClick={onExport}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>
    </div>
  );
};
