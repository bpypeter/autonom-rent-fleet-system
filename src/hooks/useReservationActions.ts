
import { toast } from 'sonner';
import { useReservations } from '@/contexts/ReservationContext';

export const useReservationActions = () => {
  const { updateReservation } = useReservations();

  const handleViewReservation = (reservation: any, setSelectedReservation: (res: any) => void, setShowModal: (show: boolean) => void) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const handleViewProforma = (reservation: any, setSelectedReservation: (res: any) => void, setShowModal: (show: boolean) => void) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const handleEditReservation = (reservation: any) => {
    toast.info(`Editare rezervare ${reservation.code} - Funcționalitate în dezvoltare`);
  };

  const handleCancelReservation = (reservation: any) => {
    updateReservation(reservation.id, { status: 'cancelled' });
    toast.error(`Rezervarea ${reservation.code} a fost anulată`);
  };

  return {
    handleViewReservation,
    handleViewProforma,
    handleEditReservation,
    handleCancelReservation
  };
};
