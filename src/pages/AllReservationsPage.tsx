
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ReservationDetailsModal } from '@/components/ReservationDetailsModal';
import { ReservationDocumentsDropdown } from '@/components/documents/ReservationDocumentsDropdown';
import { useReservations } from '@/contexts/ReservationContext';
import { mockClients, mockVehicles } from '@/data/mockData';
import { Search, Filter, Eye, Edit, Trash2, Check, X, Car, Calendar, DollarSign, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

export const AllReservationsPage: React.FC = () => {
  const { reservations, updateReservation } = useReservations();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
  const [showReservationDetails, setShowReservationDetails] = useState(false);

  const filteredReservations = reservations.filter(reservation => {
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

  const handleConfirmReservation = (reservation: any) => {
    updateReservation(reservation.id, { status: 'confirmed' });
    toast.success(`Rezervarea ${reservation.code} a fost confirmată`);
  };

  const handleRejectReservation = (reservation: any) => {
    updateReservation(reservation.id, { status: 'cancelled' });
    toast.error(`Rezervarea ${reservation.code} a fost anulată`);
  };

  const handleStatusChange = (reservation: any, newStatus: string) => {
    const statusLabels = {
      active: 'activă',
      confirmed: 'confirmată',
      pending: 'în așteptare',
      cancelled: 'anulată'
    };

    updateReservation(reservation.id, { status: newStatus });
    toast.success(`Rezervarea ${reservation.code} a fost marcată ca ${statusLabels[newStatus as keyof typeof statusLabels]}`);
  };

  const handleDeleteReservation = (reservation: any) => {
    toast.error(`Ștergere rezervare ${reservation.code} - Funcționalitate în dezvoltare`);
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Toate Rezervările</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Vizualizați și gestionați toate rezervările din sistem
        </p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl">Rezervări ({filteredReservations.length})</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Lista completă a rezervărilor din sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 mb-6">
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
                        <div className="text-xs text-muted-foreground">{client?.email}</div>
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

                    {/* Documents section for mobile */}
                    <div className="pt-2 border-t">
                      <ReservationDocumentsDropdown
                        reservationId={reservation.id}
                        reservationCode={reservation.code}
                        clientName={client?.name || 'Client necunoscut'}
                      />
                    </div>

                    <div className="flex flex-col gap-2 pt-2 border-t">
                      {reservation.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleConfirmReservation(reservation)}
                            className="text-xs text-green-600 hover:text-green-700 flex-1 h-8 px-2"
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Confirmă
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRejectReservation(reservation)}
                            className="text-xs text-red-600 hover:text-red-700 flex-1 h-8 px-2"
                          >
                            <X className="w-3 h-3 mr-1" />
                            Anulează
                          </Button>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewReservation(reservation)}
                          className="text-xs flex-1 h-8 px-2"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Vezi
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-xs flex-1 h-8 px-2"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Status
                              <ChevronDown className="w-3 h-3 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(reservation, 'active')}
                              className="text-xs"
                            >
                              Activă
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(reservation, 'confirmed')}
                              className="text-xs"
                            >
                              Confirmată
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(reservation, 'pending')}
                              className="text-xs"
                            >
                              În așteptare
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(reservation, 'cancelled')}
                              className="text-xs"
                            >
                              Anulată
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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
                  <TableHead className="text-xs">Client</TableHead>
                  <TableHead className="text-xs">Vehicul</TableHead>
                  <TableHead className="text-xs">Perioada</TableHead>
                  <TableHead className="text-xs">Total</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Documente</TableHead>
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
                      <TableCell className="text-xs">
                        <div>
                          <div className="font-medium">{client?.name}</div>
                          <div className="text-muted-foreground">{client?.email}</div>
                        </div>
                      </TableCell>
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
                        <ReservationDocumentsDropdown
                          reservationId={reservation.id}
                          reservationCode={reservation.code}
                          clientName={client?.name || 'Client necunoscut'}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {reservation.status === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleConfirmReservation(reservation)}
                                title="Confirmă rezervarea"
                                className="text-xs h-8 w-8 p-0 text-green-600 hover:text-green-700"
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRejectReservation(reservation)}
                                title="Anulează rezervarea"
                                className="text-xs h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewReservation(reservation)}
                            title="Vizualizează detalii"
                            className="text-xs h-8 w-8 p-0"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                title="Editează statusul rezervării"
                                className="text-xs h-8 w-8 p-0"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(reservation, 'active')}
                                className="text-xs"
                              >
                                Activă
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(reservation, 'confirmed')}
                                className="text-xs"
                              >
                                Confirmată
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(reservation, 'pending')}
                                className="text-xs"
                              >
                                În așteptare
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(reservation, 'cancelled')}
                                className="text-xs"
                              >
                                Anulată
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteReservation(reservation)}
                            title="Șterge rezervarea"
                            className="text-xs h-8 w-8 p-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
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
              <p className="text-muted-foreground text-sm">Nu au fost găsite rezervări care să corespundă criteriilor.</p>
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
