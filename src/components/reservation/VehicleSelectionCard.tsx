
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const VehicleSelectionCard: React.FC = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <p className="text-center text-muted-foreground">
          Selectați un vehicul pentru a face o rezervare
        </p>
      </CardContent>
    </Card>
  );
};
