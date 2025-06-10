
import React from 'react';

interface ReservationSummaryProps {
  days: number;
  dailyRate: number;
  total: number;
}

export const ReservationSummary: React.FC<ReservationSummaryProps> = ({
  days,
  dailyRate,
  total
}) => {
  return (
    <div className="p-4 bg-muted rounded-lg">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Număr zile:</span>
          <span className="font-medium">{days}</span>
        </div>
        <div className="flex justify-between">
          <span>Tarif zilnic:</span>
          <span className="font-medium">{dailyRate} RON</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-primary">
          <span>Total:</span>
          <span>{total} RON</span>
        </div>
      </div>
    </div>
  );
};
