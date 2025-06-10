
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PaymentSuccessMessage } from '@/components/payment/PaymentSuccessMessage';
import { Building2, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface BankTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onTransferComplete: () => void;
  reservationCode?: string;
}

export const BankTransferModal: React.FC<BankTransferModalProps> = ({
  isOpen,
  onClose,
  amount,
  onTransferComplete,
  reservationCode = ''
}) => {
  const [transferConfirmed, setTransferConfirmed] = useState(false);

  const bankDetails = {
    accountName: 'AUTONOM SERVICES SA',
    iban: 'RO49 AAAA 1B31 0075 9384 0000',
    bank: 'BCR - Banca Comercială Română',
    swift: 'RNCBROBU'
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiat în clipboard`);
  };

  const handleConfirmTransfer = () => {
    setTransferConfirmed(true);
    onTransferComplete();
  };

  if (transferConfirmed) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <PaymentSuccessMessage
            isVisible={true}
            paymentMethod="transfer"
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
            <Building2 className="w-5 h-5" />
            Transfer Bancar
          </DialogTitle>
          <DialogDescription>
            Efectuați transferul de {amount} RON folosind datele de mai jos
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Beneficiar:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(bankDetails.accountName, 'Numele beneficiarului')}
                  className="h-auto p-1"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <p className="font-mono text-sm">{bankDetails.accountName}</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">IBAN:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(bankDetails.iban, 'IBAN-ul')}
                  className="h-auto p-1"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <p className="font-mono text-sm">{bankDetails.iban}</p>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Banca:</span>
              <p className="text-sm">{bankDetails.bank}</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Suma:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(amount.toString(), 'Suma')}
                  className="h-auto p-1"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <p className="font-bold text-lg">{amount} RON</p>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Detalii plată:</span>
              <p className="text-sm">Rezervare {reservationCode}</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-sm text-muted-foreground space-y-2">
          <p>• Transferul poate dura 1-2 zile lucrătoare</p>
          <p>• Rezervarea va fi confirmată după primirea plății</p>
          <p>• Păstrați dovada transferului pentru referințe</p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Anulează
          </Button>
          <Button onClick={handleConfirmTransfer} className="flex-1">
            <CheckCircle className="w-4 h-4 mr-2" />
            Am efectuat transferul
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
