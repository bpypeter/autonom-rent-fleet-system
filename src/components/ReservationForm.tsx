
import React, { useState } from 'react';
import { useReservations } from '@/contexts/ReservationContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CardPaymentModal } from '@/components/CardPaymentModal';
import { BankTransferModal } from '@/components/BankTransferModal';
import { Calendar, CreditCard, Banknote, Building2 } from 'lucide-react';
import { toast } from 'sonner';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  dailyRate: number;
  licensePlate: string;
}

interface ReservationFormProps {
  vehicle: Vehicle;
  onClose: () => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ vehicle, onClose }) => {
  const { addReservation } = useReservations();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showCardModal, setShowCardModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    return calculateDays() * vehicle.dailyRate;
  };

  // Generate reservation code
  const generateReservationCode = () => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `REZ${date}-${randomNum}`;
  };

  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
    
    if (method === 'card') {
      setShowCardModal(true);
    } else if (method === 'transfer') {
      setShowBankModal(true);
    } else if (method === 'cash') {
      handleCompleteReservation();
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

    // Create new reservation
    const newReservation = {
      id: `reservation_${Date.now()}`,
      code: generateReservationCode(),
      clientId: user.id,
      vehicleId: vehicle.id,
      startDate,
      endDate,
      totalDays: calculateDays(),
      totalAmount: calculateTotal(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    addReservation(newReservation);
    
    toast.success(`Rezervarea ${newReservation.code} a fost creată cu succes și este în așteptarea confirmării!`);
    onClose();
  };

  const handleCardPaymentComplete = () => {
    setShowCardModal(false);
    handleCompleteReservation();
  };

  const handleBankTransferComplete = () => {
    setShowBankModal(false);
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
            {vehicle.brand} {vehicle.model} - {vehicle.licensePlate}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data început</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Data sfârșit</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {startDate && endDate && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Număr zile:</span>
                  <span className="font-medium">{calculateDays()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tarif zilnic:</span>
                  <span className="font-medium">{vehicle.dailyRate} RON</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary">
                  <span>Total:</span>
                  <span>{calculateTotal()} RON</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Label>Modalitate de plată</Label>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="justify-start h-auto p-4"
                onClick={() => handlePaymentMethodSelect('cash')}
              >
                <Banknote className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Numerar</div>
                  <div className="text-sm text-muted-foreground">Plata la ridicarea vehiculului</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="justify-start h-auto p-4"
                onClick={() => handlePaymentMethodSelect('card')}
              >
                <CreditCard className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Card bancar</div>
                  <div className="text-sm text-muted-foreground">Plata online cu cardul</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="justify-start h-auto p-4"
                onClick={() => handlePaymentMethodSelect('transfer')}
              >
                <Building2 className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Transfer bancar</div>
                  <div className="text-sm text-muted-foreground">Transfer în contul companiei</div>
                </div>
              </Button>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Anulează
            </Button>
          </div>
        </CardContent>
      </Card>

      <CardPaymentModal
        isOpen={showCardModal}
        onClose={() => setShowCardModal(false)}
        amount={calculateTotal()}
        onComplete={handleCardPaymentComplete}
      />

      <BankTransferModal
        isOpen={showBankModal}
        onClose={() => setShowBankModal(false)}
        amount={calculateTotal()}
        onComplete={handleBankTransferComplete}
      />
    </>
  );
};
