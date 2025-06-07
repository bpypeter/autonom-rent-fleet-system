import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockReservations, mockVehicles } from '@/data/mockData';
import { Search, Filter, Eye, Download, Calendar } from 'lucide-react';
import { Car, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MyReservationsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // For demo purposes, we'll show all reservations. In a real app, you'd filter by user.id
  const userReservations = mockReservations; // .filter(r => r.clientId === user?.id);

  const filteredReservations = userReservations.filter(reservation => {
    const vehicle = mockVehicles.find(v => v.id === reservation.vehicleId);
    
    const matchesSearch = 
      reservation.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  // Mock data - în viitor va fi înlocuit cu date reale
  const [reservations] = useState([]);

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
            <div className="text-2xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">Total Rezervări</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">0</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">0</div>
            <p className="text-sm text-muted-foreground">Confirmate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-600">0</div>
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
        </CardContent>
      </Card>
    </div>
  );
};
