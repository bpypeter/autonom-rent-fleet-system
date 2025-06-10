
import { useMemo } from 'react';
import { mockClients, mockVehicles } from '@/data/mockData';

export const useReservationFiltering = (reservations: any[], searchTerm: string, statusFilter: string) => {
  return useMemo(() => {
    return reservations.filter(reservation => {
      const client = mockClients.find(c => c.id === reservation.clientId);
      const vehicle = mockVehicles.find(v => v.id === reservation.vehicleId);
      
      const matchesSearch = 
        reservation.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle?.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle?.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [reservations, searchTerm, statusFilter]);
};
