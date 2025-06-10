
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DocumentsDropdown } from '@/components/documents/DocumentsDropdown';
import { ReservationDocumentsDropdown } from '@/components/documents/ReservationDocumentsDropdown';
import { Calendar, Car, DollarSign, Eye, FileText, Trash2 } from 'lucide-react';

interface ReservationMobileCardProps {
  reservation: any;
  client: any;
  vehicle: any;
  getStatusBadge: (status: string) => React.ReactNode;
  handleViewReservation: (reservation: any) => void;
  handleViewProforma: (reservation: any) => void;
  handleCancelReservation: (reservation: any) => void;
  isOperatorOrClient: boolean;
}

export const ReservationMobileCard: React.FC<ReservationMobileCardProps> = ({
  reservation,
  client,
  vehicle,
  getStatusBadge,
  handleViewReservation,
  handleViewProforma,
  handleCancelReservation,
  isOperatorOrClient
}) => {
  return (
    <Card className="p-3 sm:p-4">
      <div className="space-y-2 sm:space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-medium text-xs sm:text-sm">{reservation.code}</div>
            <div className="text-xs text-muted-foreground">{client?.name}</div>
          </div>
          {getStatusBadge(reservation.status)}
        </div>
        
        <div className="space-y-1.5 sm:space-y-2 text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Car className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{vehicle?.brand} {vehicle?.model}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Calendar className="w-3 h-3 flex-shrink-0" />
            <span className="text-xs">{reservation.startDate} → {reservation.endDate}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <DollarSign className="w-3 h-3 flex-shrink-0" />
            <span className="font-medium text-xs sm:text-sm">{reservation.totalAmount} RON</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleViewReservation(reservation)}
            className="flex-1 text-xs h-7 sm:h-8"
          >
            <Eye className="w-3 h-3 mr-1" />
            Vezi
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleViewProforma(reservation)}
            className="flex-1 text-xs h-7 sm:h-8"
          >
            <FileText className="w-3 h-3 mr-1" />
            Factură
          </Button>
          {isOperatorOrClient && reservation.status === 'pending' && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleCancelReservation(reservation)}
              className="text-xs text-red-600 hover:text-red-700 h-7 sm:h-8"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Anulează
            </Button>
          )}
        </div>

        <div className="pt-2 border-t space-y-2">
          <DocumentsDropdown
            reservationId={reservation.id}
            reservationCode={reservation.code}
            clientName={client?.name || 'Client necunoscut'}
          />
          <ReservationDocumentsDropdown
            reservationId={reservation.id}
            reservationCode={reservation.code}
            clientName={client?.name || 'Client necunoscut'}
          />
        </div>
      </div>
    </Card>
  );
};
