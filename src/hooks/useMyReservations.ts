
import { useMemo } from 'react';
import { useReservations } from '@/contexts/ReservationContext';
import { useAuth } from '@/contexts/AuthContext';

export const useMyReservations = () => {
  const { reservations } = useReservations();
  const { user } = useAuth();

  const userReservations = useMemo(() => {
    if (!user?.username) {
      console.log('useMyReservations - No user username available');
      return [];
    }
    
    console.log('useMyReservations - Current user:', user.username, 'role:', user.role);
    console.log('useMyReservations - Total reservations in context:', reservations.length);
    
    // For admin users, show all reservations
    if (user.role === 'admin') {
      console.log('useMyReservations - Admin user, showing all reservations');
      return reservations;
    }

    // For client users, filter by clientId matching username OR containing username pattern
    const filtered = reservations.filter(reservation => {
      console.log('useMyReservations - Checking reservation clientId:', reservation.clientId, 'against user:', user.username);
      // Match exact username OR username pattern (for existing mock data)
      return reservation.clientId === user.username || 
             (user.username === 'client' && reservation.clientId.startsWith('client_'));
    });

    console.log(`useMyReservations - Filtered ${filtered.length} reservations for user ${user.username} (${user.role})`);
    
    // Log the actual reservations for debugging
    filtered.forEach(res => {
      console.log('useMyReservations - User reservation:', res.code, 'clientId:', res.clientId, 'status:', res.status);
    });
    
    return filtered;
  }, [reservations, user?.username, user?.role]);

  return {
    userReservations,
    user
  };
};
