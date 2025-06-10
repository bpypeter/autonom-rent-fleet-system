
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ReservationDetailsModal } from '@/components/ReservationDetailsModal';
import { ProformaInvoiceModal } from '@/components/ProformaInvoiceModal';
import { ReservationFilters } from '@/components/reservations/ReservationFilters';
import { ReservationMobileCard } from '@/components/reservations/ReservationMobileCard';
import { ReservationTableRow } from '@/components/reservations/ReservationTableRow';
import { useReservations } from '@/contexts/ReservationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useReservationFiltering } from '@/hooks/useReservationFiltering';
import { useReservationActions } from '@/hooks/useReservationActions';
import { getStatusBadge } from '@/utils/reservationUtils';
import { mockClients, mockVehicles } from '@/data/mockData';

export const MyReservationsPage: React.FC = () => {
  const { reservations } = useReservations();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
  const [showReservationDetails, setShowReservationDetails] = useState(false);
  const [showProformaInvoice, setShowProformaInvoice] = useState(false);

  // Filter reservations based on user role - Fixed logic
  const userReservations = user?.role === 'admin' 
    ? reservations 
    : reservations.filter(reservation => reservation.clientId === user?.id);

  const filteredReservations = useReservationFiltering(userReservations, searchTerm, statusFilter);

  const {
    handleViewReservation: baseHandleViewReservation,
    handleViewProforma: baseHandleViewProforma,
    handleCancelReservation
  } = useReservationActions();

  const handleViewReservation = (reservation: any) => {
    baseHandleViewReservation(reservation, setSelectedReservation, setShowReservationDetails);
  };

  const handleViewProforma = (reservation: any) => {
    baseHandleViewProforma(reservation, setSelectedReservation, setShowProformaInvoice);
  };

  const isOperatorOrClient = user?.role === 'operator' || user?.role === 'client';

  console.log('MyReservationsPage - Current reservations:', filteredReservations);
  console.log('MyReservationsPage - Current user:', user);
  console.log('MyReservationsPage - All reservations from context:', reservations);
  console.log('MyReservationsPage - User reservations after filtering:', userReservations);

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-2 sm:p-3 lg:p-6">
      <div className="space-y-1 sm:space-y-2">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
          {user?.role === 'admin' ? 'Toate Rezervările' : 'Rezervările Mele'}
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
          {user?.role === 'admin' 
            ? 'Vizualizați și gestionați toate rezervările din sistem'
            : 'Vizualizați și gestionați rezervările dvs.'
          }
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg lg:text-xl">
            Rezervări ({filteredReservations.length})
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {user?.role === 'admin' 
              ? 'Lista completă a rezervărilor din sistem'
              : 'Lista rezervărilor dvs.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <ReservationFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          {/* Mobile Cards View */}
          <div className="block lg:hidden space-y-2 sm:space-y-3">
            {filteredReservations.map(reservation => {
              const client = mockClients.find(c => c.id === reservation.clientId);
              const vehicle = mockVehicles.find(v => v.id === reservation.vehicleId);
              
              return (
                <ReservationMobileCard
                  key={reservation.id}
                  reservation={reservation}
                  client={client}
                  vehicle={vehicle}
                  getStatusBadge={getStatusBadge}
                  handleViewReservation={handleViewReservation}
                  handleViewProforma={handleViewProforma}
                  handleCancelReservation={handleCancelReservation}
                  isOperatorOrClient={isOperatorOrClient}
                />
              );
            })}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs whitespace-nowrap">Cod Rezervare</TableHead>
                  {user?.role === 'admin' && <TableHead className="text-xs whitespace-nowrap">Client</TableHead>}
                  <TableHead className="text-xs whitespace-nowrap">Vehicul</TableHead>
                  <TableHead className="text-xs whitespace-nowrap">Perioada</TableHead>
                  <TableHead className="text-xs whitespace-nowrap">Total</TableHead>
                  <TableHead className="text-xs whitespace-nowrap">Status</TableHead>
                  <TableHead className="text-xs whitespace-nowrap">Documente</TableHead>
                  <TableHead className="text-xs whitespace-nowrap">Documente Rezervare</TableHead>
                  <TableHead className="text-xs whitespace-nowrap">Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map(reservation => {
                  const client = mockClients.find(c => c.id === reservation.clientId);
                  const vehicle = mockVehicles.find(v => v.id === reservation.vehicleId);
                  
                  return (
                    <ReservationTableRow
                      key={reservation.id}
                      reservation={reservation}
                      client={client}
                      vehicle={vehicle}
                      getStatusBadge={getStatusBadge}
                      handleViewReservation={handleViewReservation}
                      handleViewProforma={handleViewProforma}
                      handleCancelReservation={handleCancelReservation}
                      isOperatorOrClient={isOperatorOrClient}
                      showClientColumn={user?.role === 'admin'}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredReservations.length === 0 && (
            <div className="text-center py-6 sm:py-8">
              <p className="text-muted-foreground text-xs sm:text-sm">
                Nu au fost găsite rezervări care să corespundă criteriilor.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <ReservationDetailsModal
        reservation={selectedReservation}
        isOpen={showReservationDetails}
        onClose={() => {
          setShowReservationDetails(false);
          setSelectedReservation(null);
        }}
      />

      <ProformaInvoiceModal
        reservation={selectedReservation}
        isOpen={showProformaInvoice}
        onClose={() => {
          setShowProformaInvoice(false);
          setSelectedReservation(null);
        }}
      />
    </div>
  );
};
