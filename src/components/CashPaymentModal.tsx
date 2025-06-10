
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Banknote } from 'lucide-react';

interface CashPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
  amount: number;
}

export const CashPaymentModal: React.FC<CashPaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentComplete,
  amount
}) => {
  const handleConfirm = () => {
    onPaymentComplete();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Banknote className="w-5 h-5" />
            Plată Numerar
          </DialogTitle>
          <DialogDescription>
            Aveți de plătit suma de {amount} RON
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center p-6 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary mb-2">
              {amount} RON
            </div>
            <p className="text-sm text-muted-foreground">
              Plata se va efectua la ridicarea vehiculului
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Anulează
            </Button>
            <Button type="button" onClick={handleConfirm} className="flex-1">
              Trimite rezervare
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
