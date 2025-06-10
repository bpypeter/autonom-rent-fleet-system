
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface ReservationFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export const ReservationFilters: React.FC<ReservationFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter
}) => {
  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-3 md:flex-row md:gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3 sm:w-4 sm:h-4" />
        <Input
          placeholder="Căutați după cod, client sau vehicul..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8 sm:pl-10 text-xs sm:text-sm h-8 sm:h-10"
        />
      </div>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full md:w-40 lg:w-48 h-8 sm:h-10 text-xs sm:text-sm">
          <SelectValue placeholder="Toate statusurile" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toate statusurile</SelectItem>
          <SelectItem value="pending">În așteptare</SelectItem>
          <SelectItem value="confirmed">Confirmată</SelectItem>
          <SelectItem value="active">Activă</SelectItem>
          <SelectItem value="completed">Finalizată</SelectItem>
          <SelectItem value="cancelled">Anulată</SelectItem>
        </SelectContent>
      </Select>
      {(searchTerm || statusFilter !== 'all') && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="text-xs h-8 sm:h-10"
        >
          <Filter className="w-3 h-3 mr-1" />
          Reset
        </Button>
      )}
    </div>
  );
};
