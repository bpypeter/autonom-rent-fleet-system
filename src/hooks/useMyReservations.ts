
import { useMemo } from 'react';
import { useReservations } from '@/contexts/ReservationContext';
import { useAuth } from '@/contexts/AuthContext';

export const useMyReservations = () => {
  const { reservations } = useReservations();
  const { user } = useAuth();

  const userReservations = useMemo(() => {
    // Debug logging
    console.log('useMyReservations - DEBUG START');
    console.log('useMyReservations - Current user:', user);
    console.log('useMyReservations - User username:', user?.username);
    console.log('useMyReservations - User role:', user?.role);
    console.log('useMyReservations - All reservations from context:', reservations);
    
    // Check each reservation individually
    reservations.forEach((reservation, index) => {
      console.log(`useMyReservations - Reservation ${index}:`, {
        id: reservation.id,
        clientId: reservation.clientId,
        code: reservation.code,
        matchesUser: reservation.clientId === user?.username
      });
    });

    // Filter reservations based on user role - Use username for matching
    const filtered = user?.role === 'admin' 
      ? reservations 
      : reservations.filter(reservation => {
          console.log(`useMyReservations - Filtering reservation ${reservation.code}: clientId=${reservation.clientId}, username=${user?.username}, matches=${reservation.clientId === user?.username}`);
          return reservation.clientId === user?.username;
        });

    console.log('useMyReservations - User reservations after filtering:', filtered);
    console.log('useMyReservations - DEBUG END');

    return filtered;
  }, [reservations, user]);

  return {
    userReservations,
    user
  };
};
