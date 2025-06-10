
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Vehicle } from '@/types';

interface ReservationDetailsStepProps {
  selectedVehicle: Vehicle;
  startDate: string;
  endDate: string;
  observations: string;
  isSubmitting: boolean;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onObservationsChange: (observations: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  calculateDays: () => number;
  calculateTotal: () => number;
}

export const ReservationDetailsStep: React.FC<ReservationDetailsStepProps> = ({
  selectedVehicle,
  startDate,
  endDate,
  observations,
  isSubmitting,
  onStartDateChange,
  onEndDateChange,
  onObservationsChange,
  onSubmit,
  calculateDays,
  calculateTotal
}) => {
  const totalDays = calculateDays();
  const totalAmount = calculateTotal();

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Data început</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-form-type="other"
            data-lpignore="true"
            data-1p-ignore="true"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">Data sfârșit</Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            min={startDate || new Date().toISOString().split('T')[0]}
            required
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-form-type="other"
            data-lpignore="true"
            data-1p-ignore="true"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="observations">Observații (opțional)</Label>
        <Textarea
          id="observations"
          value={observations}
          onChange={(e) => onObservationsChange(e.target.value)}
          placeholder="Observații sau cerințe speciale..."
          rows={3}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          data-form-type="other"
          data-lpignore="true"
          data-1p-ignore="true"
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
  );
};
