
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CreditCard, Banknote, Building2 } from 'lucide-react';

interface PaymentMethodSectionProps {
  onPaymentMethodSelect: (method: string) => void;
}

export const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({
  onPaymentMethodSelect
}) => {
  return (
    <div className="space-y-3">
      <Label>Modalitate de plată</Label>
      <div className="grid grid-cols-1 gap-3">
        <Button
          variant="outline"
          className="justify-start h-auto p-4"
          onClick={() => onPaymentMethodSelect('cash')}
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
          onClick={() => onPaymentMethodSelect('card')}
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
          onClick={() => onPaymentMethodSelect('transfer')}
        >
          <Building2 className="w-5 h-5 mr-3" />
          <div className="text-left">
            <div className="font-medium">Transfer bancar</div>
            <div className="text-sm text-muted-foreground">Transfer în contul companiei</div>
          </div>
        </Button>
      </div>
    </div>
  );
};
