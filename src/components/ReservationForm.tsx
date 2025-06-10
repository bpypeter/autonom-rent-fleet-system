
import React, { useState } from 'react';
import { useReservations } from '@/contexts/ReservationContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { VehicleSelectionCard } from '@/components/reservation/VehicleSelectionCard';
import { DateSelectionSection } from '@/components/reservation/DateSelectionSection';
import { ReservationSummary } from '@/components/reservation/ReservationSummary';
import { PaymentMethodSection } from '@/components/reservation/PaymentMethodSection';
import { ReservationModals } from '@/components/reservation/ReservationModals';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  dailyRate: number;
  licensePlate: string;
}

interface ReservationFormProps {
  selectedVehicle: Vehicle | null;
  onReservationComplete: (reservationData: any) => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ selectedVehicle, onReservationComplete }) => {
  const { addReservation } = useReservations();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showCardModal, setShowCardModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showCashModal, setShowCashModal] = useState(false);
  const [reservationCode, setReservationCode] = useState('');
  
  if (!selectedVehicle) {
    return <VehicleSelectionCard />;
  }

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    return calculateDays() * selectedVehicle.dailyRate;
  };

  const generateReservationCode = () => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `REZ${date}-${randomNum}`;
  };

  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
    const newReservationCode = generateReservationCode();
    setReservationCode(newReservationCode);
    
    if (method === 'card') {
      setShowCardModal(true);
    } else if (method === 'transfer') {
      setShowBankModal(true);
    } else if (method === 'cash') {
      setShowCashModal(true);
    }
  };

  const handleCompleteReservation = () => {
    if (!user) {
      toast.error('Trebuie să fiți autentificat pentru a face o rezervare');
      return;
    }

    if (!startDate || !endDate || !paymentMethod) {
      toast.error('Vă rugăm să completați toate câmpurile');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      toast.error('Data de sfârșit trebuie să fie după data de început');
      return;
    }

    const newReservation = {
      id: `reservation_${Date.now()}`,
      code: reservationCode,
      clientId: user.id,
      vehicleId: selectedVehicle.id,
      startDate,
      endDate,
      totalDays: calculateDays(),
      totalAmount: calculateTotal(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    addReservation(newReservation);
    
    toast.success(`Rezervarea ${newReservation.code} a fost creată cu succes și este în așteptarea confirmării!`);
    onReservationComplete(newReservation);
  };

  const handleCardPaymentComplete = () => {
    setShowCardModal(false);
    handleCompleteReservation();
  };

  const handleBankTransferComplete = () => {
    setShowBankModal(false);
    handleCompleteReservation();
  };

  const handleCashPaymentComplete = () => {
    setShowCashModal(false);
    handleCompleteReservation();
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Rezervare Vehicul
          </CardTitle>
          <CardDescription>
            {selectedVehicle.brand} {selectedVehicle.model} - {selectedVehicle.licensePlate}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DateSelectionSection
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />

          {startDate && endDate && (
            <ReservationSummary
              days={calculateDays()}
              dailyRate={selectedVehicle.dailyRate}
              total={calculateTotal()}
            />
          )}

          <PaymentMethodSection onPaymentMethodSelect={handlePaymentMethodSelect} />
        </CardContent>
      </Card>

      <ReservationModals
        showCardModal={showCardModal}
        showBankModal={showBankModal}
        showCashModal={showCashModal}
        amount={calculateTotal()}
        reservationCode={reservationCode}
        onCloseCardModal={() => setShowCardModal(false)}
        onCloseBankModal={() => setShowBankModal(false)}
        onCloseCashModal={() => setShowCashModal(false)}
        onCardPaymentComplete={handleCardPaymentComplete}
        onBankTransferComplete={handleBankTransferComplete}
        onCashPaymentComplete={handleCashPaymentComplete}
      />
    </>
  );
};
