
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockClients, mockVehicles } from '@/data/mockData';
import { Calendar, Car, User, CreditCard, Clock } from 'lucide-react';

interface Reservation {
  id: string;
  code: string;
  clientId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface ReservationDetailsModalProps {
  reservation: Reservation | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationDetailsModal: React.FC<ReservationDetailsModalProps> = ({
  reservation,
  isOpen,
  onClose
}) => {
  if (!reservation) return null;

  const client = mockClients.find(c => c.id === reservation.clientId);
  const vehicle = mockVehicles.find(v => v.id === reservation.vehicleId);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      active: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    const labels = {
      pending: 'În așteptare',
      confirmed: 'Confirmată',
      active: 'Activă',
      completed: 'Finalizată',
      cancelled: 'Anulată'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]} variant="secondary">
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Detalii Rezervare - {reservation.code}
          </DialogTitle>
          <DialogDescription>
            Informații complete despre rezervarea selectată
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status:</span>
            {getStatusBadge(reservation.status)}
          </div>

          <Separator />

          {/* Client Information */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              Informații Client
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Nume:</span>
                <p className="font-medium">{client?.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>
                <p>{client?.email}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Telefon:</span>
                <p>{client?.phone}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Permis:</span>
                <p>{client?.licenseNumber}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Vehicle Information */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Car className="w-4 h-4" />
              Informații Vehicul
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Vehicul:</span>
                <p className="font-medium">{vehicle?.brand} {vehicle?.model}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Număr:</span>
                <p>{vehicle?.licensePlate}</p>
              </div>
              <div>
                <span className="text-muted-foreground">An:</span>
                <p>{vehicle?.year}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Combustibil:</span>
                <p>{vehicle?.fuelType}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Reservation Details */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Detalii Rezervare
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Data început:</span>
                <p className="font-medium">{reservation.startDate}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Data sfârșit:</span>
                <p className="font-medium">{reservation.endDate}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Număr zile:</span>
                <p>{reservation.totalDays} zile</p>
              </div>
              <div>
                <span className="text-muted-foreground">Tarif zilnic:</span>
                <p>{vehicle?.dailyRate} RON</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Financial Information */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Informații Financiare
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total:</span>
                <p className="font-bold text-lg text-green-600">{reservation.totalAmount} RON</p>
              </div>
              <div>
                <span className="text-muted-foreground">Data creării:</span>
                <p>{new Date(reservation.createdAt).toLocaleDateString('ro-RO')}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
