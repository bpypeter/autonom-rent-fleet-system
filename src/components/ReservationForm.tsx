
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useReservations } from '@/contexts/ReservationContext';
import { Vehicle } from '@/types';

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
  const [observations, setObservations] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const days = calculateDays();
    const pricePerDay = selectedVehicle?.pricePerDay || 0;
    return days * pricePerDay;
  };

  const generateReservationCode = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `RES-${timestamp}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedVehicle || !user?.username) {
      console.error('ReservationForm - Missing vehicle or user data');
      return;
    }

    if (!startDate || !endDate) {
      console.error('ReservationForm - Missing dates');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      console.error('ReservationForm - Invalid date range');
      return;
    }

    setIsSubmitting(true);

    try {
      const reservationData = {
        id: crypto.randomUUID(),
        code: generateReservationCode(),
        clientId: user.username, // Use username as clientId for matching
        vehicleId: selectedVehicle.id,
        startDate,
        endDate,
        totalDays: calculateDays(),
        totalAmount: calculateTotal(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        observations: observations || ''
      };

      console.log('ReservationForm - Creating reservation:', reservationData);
      
      // Add to context
      addReservation(reservationData);
      
      // Call the completion handler
      onReservationComplete(reservationData);
      
      // Reset form
      setStartDate('');
      setEndDate('');
      setObservations('');
      
    } catch (error) {
      console.error('ReservationForm - Error creating reservation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedVehicle) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Formular Rezervare
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Selectați un vehicul pentru a face o rezervare
          </p>
        </CardContent>
      </Card>
    );
  }

  const totalDays = calculateDays();
  const totalAmount = calculateTotal();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Rezervare pentru {selectedVehicle.brand} {selectedVehicle.model}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data început</Label>
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
              <Label htmlFor="endDate">Data sfârșit</Label>
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

          <div className="space-y-2">
            <Label htmlFor="observations">Observații (opțional)</Label>
            <Textarea
              id="observations"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Observații sau cerințe speciale..."
              rows={3}
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
            {isSubmitting ? 'Se creează rezervarea...' : 'Creează Rezervarea'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
