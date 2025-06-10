
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useReservations } from '@/contexts/ReservationContext';
import { Vehicle } from '@/types';
import { PaymentMethodSection } from '@/components/reservation/PaymentMethodSection';
import { ReservationModals } from '@/components/reservation/ReservationModals';

interface ReservationFormProps {
  selectedVehicle: Vehicle | null;
  onReservationComplete: (reservationData: any) => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
  selectedVehicle,
  onReservationComplete
}) => {
  const { user } = useAuth();
  const { addReservation } = useReservations();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [observations, setObservations] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<'details' | 'payment'>('details');
  const [pendingReservation, setPendingReservation] = useState<any>(null);

  // Payment modals state
  const [showCardModal, setShowCardModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showCashModal, setShowCashModal] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!selectedVehicle || !user?.username) {
      console.error('ReservationForm - Missing vehicle or user data');
      return;
    }

    if (!startDate || !endDate) {
      console.error('ReservationForm - Missing dates');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      console.error('ReservationForm - Invalid date range');
      return;
    }

    setIsSubmitting(true);

    try {
      const reservationData = {
        id: crypto.randomUUID(),
        code: generateReservationCode(),
        clientId: user.username,
        vehicleId: selectedVehicle.id,
        startDate,
        endDate,
        totalDays: calculateDays(),
        totalAmount: calculateTotal(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        observations: observations || ''
      };

      console.log('ReservationForm - Creating reservation with clientId:', user.username);
      
      setPendingReservation(reservationData);
      setCurrentStep('payment');
      
    } catch (error) {
      console.error('ReservationForm - Error creating reservation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentMethodSelect = (method: string) => {
    if (!pendingReservation) return;

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
    if (pendingReservation) {
      console.log('ReservationForm - Adding reservation to context:', pendingReservation);
      addReservation(pendingReservation);
      onReservationComplete(pendingReservation);
      
      // Reset form
      setStartDate('');
      setEndDate('');
      setObservations('');
      setCurrentStep('details');
      setPendingReservation(null);
    }
    
    setShowCardModal(false);
    setShowBankModal(false);
    setShowCashModal(false);
  };

  const handleBackToDetails = () => {
    setCurrentStep('details');
    setPendingReservation(null);
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
            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Data început</Label>
                  <Input
                    id="startDate"
                    name="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Data sfârșit</Label>
                  <Input
                    id="endDate"
                    name="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observations">Observații (opțional)</Label>
                <Textarea
                  id="observations"
                  name="observations"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder="Observații sau cerințe speciale..."
                  autoComplete="off"
                  rows={3}
                />
              </div>

              {totalDays > 0 && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Număr zile:</span>
                      <span className="font-medium">{totalDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Preț per zi:</span>
                      <span className="font-medium">{selectedVehicle.pricePerDay} RON</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-lg">{totalAmount} RON</span>
                    </div>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={!startDate || !endDate || isSubmitting || totalDays <= 0}
              >
                {isSubmitting ? 'Se procesează...' : 'Continuă la plată'}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Vehicul:</span>
                    <span className="font-medium">{selectedVehicle.brand} {selectedVehicle.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Perioada:</span>
                    <span className="font-medium">{startDate} - {endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Număr zile:</span>
                    <span className="font-medium">{totalDays}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Total de plată:</span>
                    <span className="font-bold text-lg">{totalAmount} RON</span>
                  </div>
                </div>
              </div>

              <PaymentMethodSection onPaymentMethodSelect={handlePaymentMethodSelect} />

              <Button 
                variant="outline" 
                onClick={handleBackToDetails}
                className="w-full"
              >
                Înapoi la detalii
              </Button>
            </div>
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
