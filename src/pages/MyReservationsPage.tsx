
import React from 'react';
import { MyReservationsHeader } from '@/components/pages/MyReservationsHeader';
import { MyReservationsContent } from '@/components/pages/MyReservationsContent';
import { useMyReservations } from '@/hooks/useMyReservations';

export const MyReservationsPage: React.FC = React.memo(() => {
  const { userReservations, user } = useMyReservations();

  console.log('MyReservationsPage - Received userReservations:', userReservations.length);
  console.log('MyReservationsPage - User role:', user?.role);
  
  if (userReservations.length > 0) {
    console.log('MyReservationsPage - Reservations to display:');
    userReservations.forEach(res => {
      console.log('  - Code:', res.code, 'ClientId:', res.clientId, 'Status:', res.status);
    });
  } else {
    console.log('MyReservationsPage - No reservations to display');
  }

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-2 sm:p-3 lg:p-6">
      <MyReservationsHeader userRole={user?.role} />
      <MyReservationsContent 
        userReservations={userReservations} 
        userRole={user?.role}
      />
    </div>
  );
});

MyReservationsPage.displayName = 'MyReservationsPage';

export default MyReservationsPage;
