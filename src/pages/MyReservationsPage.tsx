
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ReservationDetailsModal } from '@/components/ReservationDetailsModal';
import { useReservations } from '@/contexts/ReservationContext';
import { useAuth } from '@/contexts/AuthContext';
import { mockClients, mockVehicles } from '@/data/mockData';
import { Search, Filter, Eye, Edit, Trash2, Calendar, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

export const MyReservationsPage: React.FC = () => {
  const { reservations, updateReservation } = useReservations();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
  const [showReservationDetails, setShowReservationDetails] = useState(false);

  // Filter reservations based on user role
  const userReservations = user?.role === 'admin' 
    ? reservations 
    : reservations.filter(reservation => reservation.clientId === user?.id);

  const filteredReservations = userReservations.filter(reservation => {
    const client = mockClients.find(c => c.id === reservation.clientId);
    const vehicle = mockVehicles.find(v => v.id === reservation.vehicleId);
    
    const matchesSearch = 
      reservation.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle?.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle?.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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

  const handleViewReservation = (reservation: any) => {
    setSelectedReservation(reservation);
    setShowReservationDetails(true);
  };

  const handleEditReservation = (reservation: any) => {
    toast.info(`Editare rezervare ${reservation.code} - Funcționalitate în dezvoltare`);
  };

  const handleCancelReservation = (reservation: any) => {
    updateReservation(reservation.id, { status: 'cancelled' });
    toast.error(`Rezervarea ${reservation.code} a fost anulată`);
  };

  const isOperatorOrClient = user?.role === 'operator' || user?.role === 'client';

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">
          {user?.role === 'admin' ? 'Toate Rezervările' : 'Rezervările Mele'}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {user?.role === 'admin' 
            ? 'Vizualizați și gestionați toate rezervările din sistem'
            : 'Vizualizați și gestionați rezervările dvs.'
          }
        </p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl">
            Rezervări ({filteredReservations.length})
          </CardTitle>
          <CardDescription className="text-sm">
            {user?.role === 'admin' 
              ? 'Lista completă a rezervărilor din sistem'
              : 'Lista rezervărilor dvs.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Căutați după cod, client sau vehicul..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Toate statusurile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate statusurile</SelectItem>
                <SelectItem value="pending">În așteptare</SelectItem>
                <SelectItem value="confirmed">Confirmată</SelectItem>
                <SelectItem value="active">Activă</SelectItem>
                <SelectItem value="completed">Finalizată</SelectItem>
                <SelectItem value="cancelled">Anulată</SelectItem>
              </SelectContent>
            </Select>
            {(searchTerm || statusFilter !== 'all') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="text-xs sm:text-sm"
              >
                <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Reset
              </Button>
            )}
          </div>

          {/* Mobile Cards View */}
          <div className="block lg:hidden space-y-3">
            {filteredReservations.map(reservation => {
              const client = mockClients.find(c => c.id === reservation.clientId);
              const vehicle = mockVehicles.find(v => v.id === reservation.vehicleId);
              
              return (
                <Card key={reservation.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sm">{reservation.code}</div>
                        <div className="text-xs text-muted-foreground">{client?.name}</div>
                      </div>
                      {getStatusBadge(reservation.status)}
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Car className="w-3 h-3" />
                        <span>{vehicle?.brand} {vehicle?.model}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{reservation.startDate} → {reservation.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-3 h-3" />
                        <span className="font-medium">{reservation.totalAmount} RON</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewReservation(reservation)}
                        className="flex-1 text-xs"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Vezi
                      </Button>
                      {isOperatorOrClient && reservation.status === 'pending' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCancelReservation(reservation)}
                          className="text-xs text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Anulează
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Cod Rezervare</TableHead>
                  {user?.role === 'admin' && <TableHead className="text-xs">Client</TableHead>}
                  <TableHead className="text-xs">Vehicul</TableHead>
                  <TableHead className="text-xs">Perioada</TableHead>
                  <TableHead className="text-xs">Total</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map(reservation => {
                  const client = mockClients.find(c => c.id === reservation.clientId);
                  const vehicle = mockVehicles.find(v => v.id === reservation.vehicleId);
                  
                  return (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium text-xs">{reservation.code}</TableCell>
                      {user?.role === 'admin' && (
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
                        <div className="flex items-center gap-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewReservation(reservation)}
                            title="Vizualizează detalii"
                            className="text-xs h-8 w-8 p-0"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          {isOperatorOrClient && reservation.status === 'pending' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCancelReservation(reservation)}
                              title="Anulează rezervarea"
                              className="text-xs h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredReservations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">
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
    </div>
  );
};
