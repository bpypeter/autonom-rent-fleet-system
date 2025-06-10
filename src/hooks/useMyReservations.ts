
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
    
    // Filter reservations based on user role - Use username for matching
    const filtered = user.role === 'admin' 
      ? reservations 
      : reservations.filter(reservation => reservation.clientId === user.username);

    console.log(`useMyReservations - Filtered ${filtered.length} reservations for user ${user.username} (${user.role})`);
    return filtered;
  }, [reservations, user?.username, user?.role]);

  return {
    userReservations,
    user
  };
};
