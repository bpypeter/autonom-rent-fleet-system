
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PaymentSuccessMessage } from '@/components/payment/PaymentSuccessMessage';
import { Banknote, MapPin, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface CashPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentComplete: () => void;
  reservationCode?: string;
}

export const CashPaymentModal: React.FC<CashPaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  onPaymentComplete,
  reservationCode = ''
}) => {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handleConfirmPayment = () => {
    console.log('CashPaymentModal - Confirming payment, calling onPaymentComplete');
    setPaymentConfirmed(true);
    onPaymentComplete();
  };

  if (paymentConfirmed) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <PaymentSuccessMessage
            isVisible={true}
            paymentMethod="cash"
            reservationCode={reservationCode}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Banknote className="w-5 h-5" />
            Plată în Numerar
          </DialogTitle>
          <DialogDescription>
            Informații pentru plata în numerar de {amount} RON
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {amount} RON
              </div>
              <p className="text-sm text-muted-foreground">
                Suma de plată pentru rezervarea {reservationCode}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Locația ridicării:</p>
                  <p className="text-sm text-muted-foreground">
                    Sediul AUTONOM SERVICES SA<br />
                    Strada Exemplu nr. 123, București
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Program:</p>
                  <p className="text-sm text-muted-foreground">
                    Luni - Vineri: 08:00 - 18:00<br />
                    Sâmbătă: 09:00 - 14:00<br />
                    Duminică: Închis
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Plata se efectuează la ridicarea vehiculului. 
                Vă rugăm să aveți suma exactă pregătită.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-800">
                    <strong>Atenție!</strong> Trebuie să intrați la secțiunea <strong>Rezervări</strong> pentru a descărca documentele care trebuie completate și ulterior încărcate. Fără aceste documente, rezervarea nu poate fi finalizată.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Anulează
          </Button>
          <Button onClick={handleConfirmPayment} className="flex-1">
            <CheckCircle className="w-4 h-4 mr-2" />
            Am înțeles condițiile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
