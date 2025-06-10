
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Vehicle } from '@/types';
import { ReservationDetailsStep } from '@/components/reservation/ReservationDetailsStep';
import { PaymentStep } from '@/components/reservation/PaymentStep';
import { ReservationModals } from '@/components/reservation/ReservationModals';
import { useReservationForm } from '@/hooks/useReservationForm';

interface ReservationFormProps {
  selectedVehicle: Vehicle | null;
  onReservationComplete: (reservationData: any) => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
  selectedVehicle,
  onReservationComplete
}) => {
  const {
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
  } = useReservationForm(selectedVehicle);

  // Payment modals state
  const [showCardModal, setShowCardModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showCashModal, setShowCashModal] = useState(false);

  const handlePaymentMethodSelect = (method: string) => {
    switch (method) {
      case 'card':
        setShowCardModal(true);
        break;
      case 'transfer':
        setShowBankModal(true);
        break;
      case 'cash':
        setShowCashModal(true);
        break;
    }
  };

  const handlePaymentComplete = () => {
    const completedReservation = completeReservation();
    if (completedReservation) {
      onReservationComplete(completedReservation);
    }
    
    setShowCardModal(false);
    setShowBankModal(false);
    setShowCashModal(false);
  };

  if (!selectedVehicle) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Formular Rezervare
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Selectați un vehicul pentru a face o rezervare
          </p>
        </CardContent>
      </Card>
    );
  }

  const totalDays = calculateDays();
  const totalAmount = calculateTotal();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {currentStep === 'details' 
              ? `Rezervare pentru ${selectedVehicle.brand} ${selectedVehicle.model}`
              : 'Selectați modalitatea de plată'
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 'details' ? (
            <ReservationDetailsStep
              selectedVehicle={selectedVehicle}
              startDate={startDate}
              endDate={endDate}
              observations={observations}
              isSubmitting={isSubmitting}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onObservationsChange={setObservations}
              onSubmit={handleSubmit}
              calculateDays={calculateDays}
              calculateTotal={calculateTotal}
            />
          ) : (
            <PaymentStep
              selectedVehicle={selectedVehicle}
              startDate={startDate}
              endDate={endDate}
              totalDays={totalDays}
              totalAmount={totalAmount}
              onPaymentMethodSelect={handlePaymentMethodSelect}
              onBackToDetails={backToDetails}
            />
          )}
        </CardContent>
      </Card>

      <ReservationModals
        showCardModal={showCardModal}
        showBankModal={showBankModal}
        showCashModal={showCashModal}
        amount={totalAmount}
        reservationCode={pendingReservation?.code || ''}
        onCloseCardModal={() => setShowCardModal(false)}
        onCloseBankModal={() => setShowBankModal(false)}
        onCloseCashModal={() => setShowCashModal(false)}
        onCardPaymentComplete={handlePaymentComplete}
        onBankTransferComplete={handlePaymentComplete}
        onCashPaymentComplete={handlePaymentComplete}
      />
    </>
  );
};
