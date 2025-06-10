
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
}

interface ReservationContextType {
  reservations: Reservation[];
  addReservation: (reservation: Reservation) => void;
  updateReservation: (id: string, updates: Partial<Reservation>) => void;
  deleteReservation: (id: string) => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const useReservations = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservations must be used within a ReservationProvider');
  }
  return context;
};

// Convert mockReservations to the Reservation interface format
const convertedMockReservations: Reservation[] = mockReservations.map(reservation => ({
  id: reservation.id,
  code: reservation.code,
  clientId: reservation.clientId,
  vehicleId: reservation.vehicleId,
  startDate: reservation.startDate,
  endDate: reservation.endDate,
  totalDays: reservation.totalDays,
  totalAmount: reservation.totalAmount,
  status: reservation.status,
  createdAt: reservation.createdAt
}));

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>(convertedMockReservations);

  const addReservation = (reservation: Reservation) => {
    setReservations(prev => [...prev, reservation]);
  };

  const updateReservation = (id: string, updates: Partial<Reservation>) => {
    setReservations(prev => prev.map(res => 
      res.id === id ? { ...res, ...updates } : res
    ));
  };

  const deleteReservation = (id: string) => {
    setReservations(prev => prev.filter(res => res.id !== id));
  };

  return (
    <ReservationContext.Provider value={{
      reservations,
      addReservation,
      updateReservation,
      deleteReservation
    }}>
      {children}
    </ReservationContext.Provider>
  );
};
