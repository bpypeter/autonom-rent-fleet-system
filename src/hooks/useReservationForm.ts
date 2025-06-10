
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useReservations } from '@/contexts/ReservationContext';
import { Vehicle } from '@/types';

export const useReservationForm = (selectedVehicle: Vehicle | null) => {
  const { user } = useAuth();
  const { addReservation } = useReservations();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [observations, setObservations] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<'details' | 'payment'>('details');
  const [pendingReservation, setPendingReservation] = useState<any>(null);

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const days = calculateDays();
    const pricePerDay = selectedVehicle?.pricePerDay || 0;
    return days * pricePerDay;
  };

  const generateReservationCode = () => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const timestamp = now.getTime().toString().slice(-6);
    return `REZ${dateStr}-${timestamp}`;
  };

  const createReservation = async () => {
    if (!selectedVehicle || !user?.username) {
      console.error('useReservationForm - Missing vehicle or user data');
      return null;
    }

    if (!startDate || !endDate) {
      console.error('useReservationForm - Missing dates');
      return null;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      console.error('useReservationForm - Invalid date range');
      return null;
    }

    const reservationData = {
      id: crypto.randomUUID(),
      code: generateReservationCode(),
      clientId: 'client', // Always use 'client' for consistency with existing data
      vehicleId: selectedVehicle.id,
      startDate,
      endDate,
      totalDays: calculateDays(),
      totalAmount: calculateTotal(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      observations: observations || ''
    };

    console.log('useReservationForm - Creating reservation with data:', {
      clientId: reservationData.clientId,
      username: user.username,
      userRole: user.role,
      code: reservationData.code
    });

    return reservationData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsSubmitting(true);

    try {
      const reservationData = await createReservation();
      if (reservationData) {
        setPendingReservation(reservationData);
        setCurrentStep('payment');
      }
    } catch (error) {
      console.error('useReservationForm - Error creating reservation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const completeReservation = () => {
    if (pendingReservation) {
      console.log('useReservationForm - Completing reservation, adding to context:', {
        id: pendingReservation.id,
        code: pendingReservation.code,
        clientId: pendingReservation.clientId
      });
      
      // Add reservation to context immediately
      addReservation(pendingReservation);
      
      console.log('useReservationForm - Reservation added to context successfully');
      
      // Reset form
      setStartDate('');
      setEndDate('');
      setObservations('');
      setCurrentStep('details');
      setPendingReservation(null);
      
      return pendingReservation;
    }
    console.log('useReservationForm - No pending reservation to complete');
    return null;
  };

  const backToDetails = () => {
    setCurrentStep('details');
    setPendingReservation(null);
  };

  return {
    startDate,
    endDate,
    observations,
    isSubmitting,
    currentStep,
    pendingReservation,
    setStartDate,
    setEndDate,
    setObservations,
    calculateDays,
    calculateTotal,
    handleSubmit,
    completeReservation,
    backToDetails
  };
};
