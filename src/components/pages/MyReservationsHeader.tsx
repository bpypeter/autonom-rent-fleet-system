
import React from 'react';

interface MyReservationsHeaderProps {
  userRole?: string;
}

export const MyReservationsHeader: React.FC<MyReservationsHeaderProps> = React.memo(({ userRole }) => {
  return (
    <div className="space-y-1 sm:space-y-2">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
        {userRole === 'admin' ? 'Toate Rezervările' : 'Rezervările Mele'}
      </h1>
      <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
        {userRole === 'admin' 
          ? 'Vizualizați și gestionați toate rezervările din sistem'
          : 'Vizualizați și gestionați rezervările dvs.'
        }
      </p>
    </div>
  );
});

MyReservationsHeader.displayName = 'MyReservationsHeader';
