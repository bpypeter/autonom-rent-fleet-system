
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockReservations, mockVehicles, mockClients } from '@/data/mockData';
import { Search, Filter, CheckCircle, AlertCircle, FileText } from 'lucide-react';

export const VehicleReturnsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter for active reservations that need to be returned
  const activeReservations = mockReservations.filter(r => r.status === 'active' || r.status === 'confirmed');

  const filteredReservations = activeReservations.filter(reservation => {
    const vehicle = mockVehicles.find(v => v.id === reservation.vehicleId);
    const client = mockClients.find(c => c.id === reservation.clientId);
    
    const matchesSearch = 
      reservation.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle?.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle?.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const getReturnStatus = (endDate: string) => {
    const today = new Date();
    const returnDate = new Date(endDate);
    const daysDiff = Math.ceil((returnDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysDiff < 0) {
      return { status: 'overdue', label: 'Întârziat', variant: 'destructive' as const };
    } else if (daysDiff === 0) {
      return { status: 'today', label: 'Azi', variant: 'default' as const };
    } else if (daysDiff <= 3) {
      return { status: 'soon', label: 'În curând', variant: 'secondary' as const };
    } else {
      return { status: 'future', label: 'Viitor', variant: 'outline' as const };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Returnări Vehicule</h1>
        <p className="text-muted-foreground">
          Gestionați returnările vehiculelor și procesele de predare-primire
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{activeReservations.length}</div>
            <p className="text-sm text-muted-foreground">Vehicule În Folosință</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">
              {activeReservations.filter(r => {
                const today = new Date();
                const returnDate = new Date(r.endDate);
                return returnDate < today;
              }).length}
            </div>
            <p className="text-sm text-muted-foreground">Întârziate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {activeReservations.filter(r => {
                const today = new Date();
                const returnDate = new Date(r.endDate);
                const daysDiff = Math.ceil((returnDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
                return daysDiff >= 0 && daysDiff <= 3;
              }).length}
            </div>
            <p className="text-sm text-muted-foreground">Returnări Următoare</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">15</div>
            <p className="text-sm text-muted-foreground">Returnări Azi</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vehicule de Returnat</CardTitle>
          <CardDescription>
            Lista vehiculelor care urmează să fie returnate
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Căutați după cod rezervare, vehicul sau client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {searchTerm && (
              <Button
                variant="outline"
                onClick={() => setSearchTerm('')}
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
                  <TableHead>Rezervare</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Vehicul</TableHead>
                  <TableHead>Data Returnare</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map(reservation => {
                  const vehicle = mockVehicles.find(v => v.id === reservation.vehicleId);
                  const client = mockClients.find(c => c.id === reservation.clientId);
                  const returnStatus = getReturnStatus(reservation.endDate);
                  
                  return (
                    <TableRow key={reservation.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{reservation.code}</div>
                          <div className="text-sm text-muted-foreground">
                            {reservation.startDate} → {reservation.endDate}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{client?.name}</div>
                          <div className="text-sm text-muted-foreground">{client?.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{vehicle?.brand} {vehicle?.model}</div>
                          <div className="text-sm text-muted-foreground">{vehicle?.licensePlate}</div>
                        </div>
                      </TableCell>
                      <TableCell>{reservation.endDate}</TableCell>
                      <TableCell>
                        <Badge variant={returnStatus.variant}>
                          {returnStatus.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <AlertCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4" />
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
              <p className="text-muted-foreground">Nu sunt vehicule de returnat în momentul acesta.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
