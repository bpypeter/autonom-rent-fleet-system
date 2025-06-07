
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockReservations, mockClients, mockVehicles } from '@/data/mockData';
import { Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';

export const AllReservationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredReservations = mockReservations.filter(reservation => {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Toate Rezervările</h1>
        <p className="text-muted-foreground">
          Vizualizați și gestionați toate rezervările din sistem
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rezervări ({filteredReservations.length})</CardTitle>
          <CardDescription>
            Lista completă a rezervărilor din sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Căutați după cod, client sau vehicul..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
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
              >
                <Filter className="w-4 h-4 mr-2" />
                Reset
              </Button>
            )}
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cod Rezervare</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Vehicul</TableHead>
                  <TableHead>Perioada</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map(reservation => {
                  const client = mockClients.find(c => c.id === reservation.clientId);
                  const vehicle = mockVehicles.find(v => v.id === reservation.vehicleId);
                  
                  return (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium">{reservation.code}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{client?.name}</div>
                          <div className="text-sm text-muted-foreground">{client?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{vehicle?.brand} {vehicle?.model}</div>
                          <div className="text-sm text-muted-foreground">{vehicle?.licensePlate}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{reservation.startDate}</div>
                          <div>→ {reservation.endDate}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{reservation.totalAmount} RON</TableCell>
                      <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-4 h-4" />
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
              <p className="text-muted-foreground">Nu au fost găsite rezervări care să corespundă criteriilor.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
