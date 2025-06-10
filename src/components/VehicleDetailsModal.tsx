
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Car, Calendar, Settings, Gauge } from 'lucide-react';

interface Vehicle {
  id: string;
  code: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  fuelType: string;
  transmission: string;
  seats: number;
  dailyRate: number;
  status: string;
  mileage: number;
  lastService: string;
  createdAt: string;
}

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({
  vehicle,
  isOpen,
  onClose
}) => {
  if (!vehicle) return null;

  const getStatusBadge = (status: string) => {
    const variants = {
      available: 'default',
      rented: 'destructive',
      maintenance: 'secondary',
      inactive: 'outline'
    } as const;

    const labels = {
      available: 'Disponibil',
      rented: 'Închiriat',
      maintenance: 'Service',
      inactive: 'Inactiv'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            Detalii Vehicul - {vehicle.code}
          </DialogTitle>
          <DialogDescription>
            Informații complete despre vehiculul selectat
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status:</span>
            {getStatusBadge(vehicle.status)}
          </div>

          <Separator />

          {/* Basic Information */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Car className="w-4 h-4" />
              Informații de Bază
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Marca:</span>
                <p className="font-medium">{vehicle.brand}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Model:</span>
                <p className="font-medium">{vehicle.model}</p>
              </div>
              <div>
                <span className="text-muted-foreground">An fabricație:</span>
                <p>{vehicle.year}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Număr înmatriculare:</span>
                <p className="font-mono">{vehicle.licensePlate}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Culoare:</span>
                <p>{vehicle.color}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Locuri:</span>
                <p>{vehicle.seats} locuri</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Technical Specifications */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Specificații Tehnice
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Combustibil:</span>
                <p className="font-medium">{vehicle.fuelType}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Transmisie:</span>
                <p>{vehicle.transmission}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Kilometraj:</span>
                <p className="flex items-center gap-1">
                  <Gauge className="w-3 h-3" />
                  {vehicle.mileage.toLocaleString()} km
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Tarif zilnic:</span>
                <p className="font-bold text-green-600">{vehicle.dailyRate} RON</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Maintenance Information */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Informații Service
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Ultimul service:</span>
                <p>{new Date(vehicle.lastService).toLocaleDateString('ro-RO')}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Data adăugării:</span>
                <p>{new Date(vehicle.createdAt).toLocaleDateString('ro-RO')}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
