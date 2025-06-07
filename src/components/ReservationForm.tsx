
import React, { useState } from 'react';
import { Vehicle } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, Car, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useReservations } from '@/contexts/ReservationContext';
import { toast } from 'sonner';

interface ReservationFormProps {
  selectedVehicle: Vehicle | null;
  onReservationComplete: (reservationData: any) => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
  selectedVehicle,
  onReservationComplete
}) => {
  const { user } = useAuth();
  const { addReservation } = useReservations();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end <= start) return 0;
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const totalDays = calculateDays();
  const totalAmount = selectedVehicle ? totalDays * selectedVehicle.dailyRate : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedVehicle || !startDate || !endDate) {
      toast.error('Vă rugăm să completați toate câmpurile');
      return;
    }

    if (totalDays <= 0) {
      toast.error('Data de sfârșit trebuie să fie după data de început');
      return;
    }

    const reservationCode = `REZ${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    
    const reservationData = {
      id: `reservation_${Date.now()}`,
      code: reservationCode,
      vehicleId: selectedVehicle.id,
      clientId: user?.id || '1',
      startDate,
      endDate,
      totalDays,
      totalAmount,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Adaugă rezervarea în context
    addReservation(reservationData);

    console.log('Reservation created:', reservationData);
    toast.success(`Rezervarea ${reservationCode} a fost creată cu succes!`);
    
    // Reset form
    setStartDate('');
    setEndDate('');
    
    onReservationComplete(reservationData);
  };

  if (!selectedVehicle) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Selectați un vehicul pentru a continua cu rezervarea.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5" />
          Rezervare Nouă
        </CardTitle>
        <CardDescription>
          Completați datele pentru rezervarea vehiculului selectat
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selected Vehicle Info */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Vehicul Selectat</h3>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{selectedVehicle.brand} {selectedVehicle.model}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedVehicle.year} • {selectedVehicle.color} • {selectedVehicle.licensePlate}
                </p>
                <p className="text-sm text-muted-foreground">Cod: {selectedVehicle.code}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{selectedVehicle.dailyRate} RON/zi</p>
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data Începerii</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Data Încheierii</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          {/* Calculation Summary */}
          {totalDays > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium">Sumar Rezervare</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Numărul de zile</p>
                    <p className="font-medium">{totalDays} zile</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tarif zilnic</p>
                    <p className="font-medium">{selectedVehicle.dailyRate} RON</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total estimativ</p>
                    <p className="font-medium text-lg">{totalAmount} RON</p>
                  </div>
                </div>
              </div>
            </>
          )}

          <Button type="submit" className="w-full" disabled={totalDays <= 0}>
            <CreditCard className="w-4 h-4 mr-2" />
            Creează Rezervarea
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
