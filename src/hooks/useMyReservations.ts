
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
      
      // For the specific 'client' user, match pattern client_X
      if (user.username === 'client') {
        const matches = reservation.clientId === 'client' || reservation.clientId.startsWith('client_');
        console.log('useMyReservations - Client user match result:', matches, 'for clientId:', reservation.clientId);
        return matches;
      }
      
      // For other users, exact match only
      const matches = reservation.clientId === user.username;
      console.log('useMyReservations - Exact match result:', matches, 'for clientId:', reservation.clientId);
      return matches;
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
