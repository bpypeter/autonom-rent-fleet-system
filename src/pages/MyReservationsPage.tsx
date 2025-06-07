
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useReservations } from '@/contexts/ReservationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockVehicles } from '@/data/mockData';
import { Calendar, Car, Plus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MyReservationsPage: React.FC = () => {
  const { user } = useAuth();
  const { reservations } = useReservations();

  const userReservations = reservations.filter(r => r.clientId === user?.id);

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

  const activeReservations = userReservations.filter(r => r.status === 'active' || r.status === 'confirmed');
  const confirmedReservations = userReservations.filter(r => r.status === 'confirmed');
  const completedReservations = userReservations.filter(r => r.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Rezervările Mele</h1>
          <p className="text-muted-foreground">
            Vizualizați și gestionați rezervările dumneavoastră
          </p>
        </div>
        <Link to="/vehicles">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Rezervare Nouă
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{userReservations.length}</div>
            <p className="text-sm text-muted-foreground">Total Rezervări</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{activeReservations.length}</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{confirmedReservations.length}</div>
            <p className="text-sm text-muted-foreground">Confirmate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-600">{completedReservations.length}</div>
            <p className="text-sm text-muted-foreground">Finalizate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rezervările Dumneavoastră</CardTitle>
          <CardDescription>
            Lista rezervărilor dumneavoastră
          </CardDescription>
        </CardHeader>
        <CardContent>
          {userReservations.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nu aveți rezervări momentan</h3>
              <p className="text-muted-foreground mb-4">
                Începeți prin a rezerva un vehicul din gama noastră disponibilă.
              </p>
              <Link to="/vehicles">
                <Button>
                  <Car className="w-4 h-4 mr-2" />
                  Explorați Vehiculele
                </Button>
              </Link>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cod Rezervare</TableHead>
                    <TableHead>Vehicul</TableHead>
                    <TableHead>Perioada</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Acțiuni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userReservations.map(reservation => {
                    const vehicle = mockVehicles.find(v => v.id === reservation.vehicleId);
                    
                    return (
                      <TableRow key={reservation.id}>
                        <TableCell className="font-medium">{reservation.code}</TableCell>
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
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
