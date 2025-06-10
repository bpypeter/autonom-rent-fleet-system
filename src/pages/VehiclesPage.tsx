
import React, { useState } from 'react';
import { VehiclesTable } from '@/components/VehiclesTable';
import { ReservationForm } from '@/components/ReservationForm';
import { Vehicle } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useReservations } from '@/contexts/ReservationContext';
import { toast } from 'sonner';

export const VehiclesPage: React.FC = () => {
  const { user } = useAuth();
  const { refreshReservations } = useReservations();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleReservationComplete = (reservationData: any) => {
    console.log('VehiclesPage - Reservation created:', reservationData);
    console.log('VehiclesPage - Created reservation details:', {
      id: reservationData.id,
      code: reservationData.code,
      clientId: reservationData.clientId,
      userId: user?.username
    });
    
    toast.success(`Rezervarea ${reservationData.code} a fost creată cu succes!`);
    setSelectedVehicle(null);
    
    // Force immediate refresh of reservations context
    console.log('VehiclesPage - Triggering reservations refresh');
    refreshReservations();
  };

  const isClient = user?.role === 'client';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vehicule Disponibile</h1>
        <p className="text-muted-foreground">
          {isClient 
            ? 'Explorați gama noastră de vehicule și făceți o rezervare'
            : 'Vizualizați toate vehiculele din flotă'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div>
          <VehiclesTable 
            onSelectVehicle={isClient ? handleVehicleSelect : undefined}
            showAvailableOnly={isClient}
          />
        </div>
        
        {isClient && (
          <div>
            <ReservationForm
              selectedVehicle={selectedVehicle}
              onReservationComplete={handleReservationComplete}
            />
          </div>
        )}
      </div>
    </div>
  );
};
