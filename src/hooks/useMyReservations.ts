
import { useMemo } from 'react';
import { useReservations } from '@/contexts/ReservationContext';
import { useAuth } from '@/contexts/AuthContext';

export const useMyReservations = () => {
  const { reservations } = useReservations();
  const { user } = useAuth();

  const userReservations = useMemo(() => {
    console.log('useMyReservations - Starting filtering process');
    console.log('useMyReservations - User:', user?.username, 'role:', user?.role);
    console.log('useMyReservations - Total reservations in context:', reservations.length);
    
    // Log ALL reservations to see what's available
    console.log('useMyReservations - ALL RESERVATIONS IN CONTEXT:');
    reservations.forEach((res, index) => {
      console.log(`  ${index + 1}. Code: ${res.code}, ClientId: "${res.clientId}", Status: ${res.status}`);
    });
    
    if (!user?.username) {
      console.log('useMyReservations - No user username available');
      return [];
    }
    
    // For admin users, show all reservations
    if (user.role === 'admin') {
      console.log('useMyReservations - Admin user, showing all reservations');
      return reservations;
    }

    // For client users, show only reservations with clientId exactly "client"
    console.log('useMyReservations - Client user, filtering reservations with clientId "client"');
    
    const filtered = reservations.filter(reservation => {
      const matches = reservation.clientId === 'client';
      console.log('useMyReservations - Checking reservation:', {
        code: reservation.code,
        clientId: `"${reservation.clientId}"`,
        matches: matches
      });
      return matches;
    });

    console.log(`useMyReservations - FINAL RESULT: Found ${filtered.length} reservations for client user`);
    
    if (filtered.length > 0) {
      console.log('useMyReservations - Filtered reservations:');
      filtered.forEach(res => {
        console.log('  - Code:', res.code, 'ClientId:', res.clientId, 'Status:', res.status);
      });
    } else {
      console.log('useMyReservations - No reservations found with clientId "client"!');
    }
    
    return filtered;
  }, [reservations, user?.username, user?.role]);

  console.log('useMyReservations - Returning', userReservations.length, 'reservations');

  return {
    userReservations,
    user
  };
};
