
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaymentSuccessMessage } from '@/components/payment/PaymentSuccessMessage';
import { CreditCard, Lock } from 'lucide-react';

interface CardPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentComplete: () => void;
  reservationCode?: string;
}

export const CardPaymentModal: React.FC<CardPaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  onPaymentComplete,
  reservationCode = ''
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulare procesare plată
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      onPaymentComplete();
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (paymentSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <PaymentSuccessMessage
            isVisible={true}
            paymentMethod="card"
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
            <CreditCard className="w-5 h-5" />
            Plată cu Cardul
          </DialogTitle>
          <DialogDescription>
            Introduceți datele cardului pentru plata de {amount} RON
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Numărul cardului</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Data expirării</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                maxLength={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                maxLength={3}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardName">Numele de pe card</Label>
            <Input
              id="cardName"
              placeholder="NUME PRENUME"
              value={cardName}
              onChange={(e) => setCardName(e.target.value.toUpperCase())}
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            Plata dvs. este securizată și criptată
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Anulează
            </Button>
            <Button 
              onClick={handlePayment} 
              disabled={isProcessing || !cardNumber || !expiryDate || !cvv || !cardName}
              className="flex-1"
            >
              {isProcessing ? 'Se procesează...' : `Plătește ${amount} RON`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
