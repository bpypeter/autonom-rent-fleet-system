
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

    // For client users, show reservations where clientId is "client"
    // This matches the pattern we're using for new reservations
    const filtered = reservations.filter(reservation => {
      console.log('useMyReservations - Checking reservation:', {
        reservationId: reservation.id,
        code: reservation.code,
        clientId: reservation.clientId,
        userUsername: user.username
      });
      
      // For the "client" user, show all reservations with clientId: "client"
      const matches = reservation.clientId === 'client';
      console.log('useMyReservations - Match result:', matches);
      return matches;
    });

    console.log(`useMyReservations - Filtered ${filtered.length} reservations for user ${user.username} (${user.role})`);
    
    if (filtered.length > 0) {
      console.log('useMyReservations - Found matching reservations:');
      filtered.forEach(res => {
        console.log('  - Reservation:', res.code, 'clientId:', res.clientId, 'status:', res.status);
      });
    } else {
      console.log('useMyReservations - No matching reservations found');
      console.log('useMyReservations - Sample available reservations:');
      reservations.slice(0, 3).forEach(res => {
        console.log('  - Reservation:', res.code, 'clientId:', res.clientId, 'status:', res.status);
      });
    }
    
    return filtered;
  }, [reservations, user?.username, user?.role]);

  return {
    userReservations,
    user
  };
};
