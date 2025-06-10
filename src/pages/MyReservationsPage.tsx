
import React from 'react';
import { MyReservationsHeader } from '@/components/pages/MyReservationsHeader';
import { MyReservationsContent } from '@/components/pages/MyReservationsContent';
import { useMyReservations } from '@/hooks/useMyReservations';

export const MyReservationsPage: React.FC = () => {
  const { userReservations, user } = useMyReservations();

  console.log('MyReservationsPage - Current reservations:', userReservations);
  console.log('MyReservationsPage - Current user:', user);

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-2 sm:p-3 lg:p-6">
      <MyReservationsHeader userRole={user?.role} />
      <MyReservationsContent 
        userReservations={userReservations} 
        userRole={user?.role}
      />
    </div>
  );
};

export default MyReservationsPage;
