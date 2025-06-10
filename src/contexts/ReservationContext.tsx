
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockReservations } from '@/data/mockData';

interface Reservation {
  id: string;
  code: string;
  clientId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  observations?: string;
}

interface ReservationContextType {
  reservations: Reservation[];
  addReservation: (reservation: Reservation) => void;
  updateReservation: (id: string, updates: Partial<Reservation>) => void;
  deleteReservation: (id: string) => void;
  refreshReservations: () => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const useReservations = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservations must be used within a ReservationProvider');
  }
  return context;
};

// Convert mockReservations to the Reservation interface format and update pending reservations
const convertedMockReservations: Reservation[] = mockReservations.map(reservation => {
  const baseReservation = {
    id: reservation.id,
    code: reservation.code,
    clientId: reservation.clientId,
    vehicleId: reservation.vehicleId,
    startDate: reservation.startDate,
    endDate: reservation.endDate,
    totalDays: reservation.totalDays,
    totalAmount: reservation.totalAmount,
    status: reservation.status,
    createdAt: reservation.createdAt,
    observations: reservation.observations || ''
  };

  // Update pending reservations to start from 13.06.2025
  if (reservation.status === 'pending') {
    const startDate = new Date('2025-06-13');
    const originalStartDate = new Date(reservation.startDate);
    const originalEndDate = new Date(reservation.endDate);
    const durationDays = Math.ceil((originalEndDate.getTime() - originalStartDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationDays);

    return {
      ...baseReservation,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
  }

  return baseReservation;
});

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>(convertedMockReservations);

  const addReservation = (reservation: Reservation) => {
    console.log('ReservationContext - Adding reservation:', {
      id: reservation.id,
      code: reservation.code,
      clientId: reservation.clientId,
      status: reservation.status
    });
    
    setReservations(prev => {
      const newReservations = [...prev, reservation];
      console.log('ReservationContext - Updated reservations count:', newReservations.length);
      console.log('ReservationContext - New reservation added with clientId:', reservation.clientId);
      console.log('ReservationContext - All current reservations:', newReservations.map(r => ({ code: r.code, clientId: r.clientId })));
      return newReservations;
    });
  };

  const updateReservation = (id: string, updates: Partial<Reservation>) => {
    console.log('ReservationContext - Updating reservation:', id, updates);
    setReservations(prev => prev.map(res => 
      res.id === id ? { ...res, ...updates } : res
    ));
  };

  const deleteReservation = (id: string) => {
    console.log('ReservationContext - Deleting reservation:', id);
    setReservations(prev => prev.filter(res => res.id !== id));
  };

  const refreshReservations = () => {
    console.log('ReservationContext - Refreshing reservations (forcing re-render)');
    // Force a re-render by creating a new array reference
    setReservations(prev => {
      const refreshed = [...prev];
      console.log('ReservationContext - After refresh, total reservations:', refreshed.length);
      return refreshed;
    });
  };

  console.log('ReservationContext - Current reservations:', reservations.length);

  return (
    <ReservationContext.Provider value={{
      reservations,
      addReservation,
      updateReservation,
      deleteReservation,
      refreshReservations
    }}>
      {children}
    </ReservationContext.Provider>
  );
};
