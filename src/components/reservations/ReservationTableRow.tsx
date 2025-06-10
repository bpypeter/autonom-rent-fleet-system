
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DocumentsDropdown } from '@/components/documents/DocumentsDropdown';
import { ReservationDocumentsDropdown } from '@/components/documents/ReservationDocumentsDropdown';
import { Eye, FileText, Trash2 } from 'lucide-react';

interface ReservationTableRowProps {
  reservation: any;
  client: any;
  vehicle: any;
  getStatusBadge: (status: string) => React.ReactNode;
  handleViewReservation: (reservation: any) => void;
  handleViewProforma: (reservation: any) => void;
  handleCancelReservation: (reservation: any) => void;
  isOperatorOrClient: boolean;
  showClientColumn: boolean;
}

export const ReservationTableRow: React.FC<ReservationTableRowProps> = ({
  reservation,
  client,
  vehicle,
  getStatusBadge,
  handleViewReservation,
  handleViewProforma,
  handleCancelReservation,
  isOperatorOrClient,
  showClientColumn
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium text-xs">{reservation.code}</TableCell>
      {showClientColumn && (
        <TableCell className="text-xs">
          <div>
            <div className="font-medium">{client?.name}</div>
            <div className="text-muted-foreground">{client?.email}</div>
          </div>
        </TableCell>
      )}
      <TableCell className="text-xs">
        <div>
          <div className="font-medium">{vehicle?.brand} {vehicle?.model}</div>
          <div className="text-muted-foreground">{vehicle?.licensePlate}</div>
        </div>
      </TableCell>
      <TableCell className="text-xs">
        <div>
          <div>{reservation.startDate}</div>
          <div>→ {reservation.endDate}</div>
        </div>
      </TableCell>
      <TableCell className="font-medium text-xs">{reservation.totalAmount} RON</TableCell>
      <TableCell>{getStatusBadge(reservation.status)}</TableCell>
      <TableCell>
        <DocumentsDropdown
          reservationId={reservation.id}
          reservationCode={reservation.code}
          clientName={client?.name || 'Client necunoscut'}
        />
      </TableCell>
      <TableCell>
        <ReservationDocumentsDropdown
          reservationId={reservation.id}
          reservationCode={reservation.code}
          clientName={client?.name || 'Client necunoscut'}
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleViewReservation(reservation)}
            title="Vizualizează detalii"
            className="text-xs h-6 w-6 p-0"
          >
            <Eye className="w-3 h-3" />
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleViewProforma(reservation)}
            title="Vizualizează factura proforma"
            className="text-xs h-6 w-6 p-0"
          >
            <FileText className="w-3 h-3" />
          </Button>
          {isOperatorOrClient && reservation.status === 'pending' && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleCancelReservation(reservation)}
              title="Anulează rezervarea"
              className="text-xs h-6 w-6 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};
