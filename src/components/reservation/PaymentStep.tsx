
import React from 'react';
import { Button } from '@/components/ui/button';
import { Vehicle } from '@/types';
import { PaymentMethodSection } from '@/components/reservation/PaymentMethodSection';

interface PaymentStepProps {
  selectedVehicle: Vehicle;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalAmount: number;
  onPaymentMethodSelect: (method: string) => void;
  onBackToDetails: () => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  selectedVehicle,
  startDate,
  endDate,
  totalDays,
  totalAmount,
  onPaymentMethodSelect,
  onBackToDetails
}) => {
  return (
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

      <PaymentMethodSection onPaymentMethodSelect={onPaymentMethodSelect} />

      <Button 
        variant="outline" 
        onClick={onBackToDetails}
        className="w-full"
      >
        Înapoi la detalii
      </Button>
    </div>
  );
};
