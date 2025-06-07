
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockVehicles } from '@/data/mockData';
import { Search, Filter, Plus, Edit, Eye, Settings } from 'lucide-react';

export const FleetManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');

  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBrand = brandFilter === 'all' || vehicle.brand === brandFilter;
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;

    return matchesSearch && matchesBrand && matchesStatus;
  });

  const uniqueBrands = [...new Set(mockVehicles.map(v => v.brand))];

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Administrare Flotă</h1>
          <p className="text-muted-foreground">
            Gestionați vehiculele din flotă
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Adaugă Vehicul
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{mockVehicles.length}</div>
            <p className="text-sm text-muted-foreground">Total Vehicule</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {mockVehicles.filter(v => v.status === 'available').length}
            </div>
            <p className="text-sm text-muted-foreground">Disponibile</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">
              {mockVehicles.filter(v => v.status === 'rented').length}
            </div>
            <p className="text-sm text-muted-foreground">Închiriate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {mockVehicles.filter(v => v.status === 'maintenance').length}
            </div>
            <p className="text-sm text-muted-foreground">În Service</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Flota de Vehicule</CardTitle>
          <CardDescription>
            Lista completă a vehiculelor din flotă
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Căutați după cod, marcă, model sau număr..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Toate mărcile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate mărcile</SelectItem>
                {uniqueBrands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Toate statusurile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate statusurile</SelectItem>
                <SelectItem value="available">Disponibil</SelectItem>
                <SelectItem value="rented">Închiriat</SelectItem>
                <SelectItem value="maintenance">Service</SelectItem>
                <SelectItem value="inactive">Inactiv</SelectItem>
              </SelectContent>
            </Select>
            {(searchTerm || brandFilter !== 'all' || statusFilter !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setBrandFilter('all');
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
                  <TableHead>Cod</TableHead>
                  <TableHead>Vehicul</TableHead>
                  <TableHead>An</TableHead>
                  <TableHead>Număr</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tarif/zi</TableHead>
                  <TableHead>Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map(vehicle => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.code}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{vehicle.brand} {vehicle.model}</div>
                        <div className="text-sm text-muted-foreground">
                          {vehicle.color} • {vehicle.fuelType} • {vehicle.transmission}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell className="font-mono">{vehicle.licensePlate}</TableCell>
                    <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                    <TableCell className="font-medium">{vehicle.dailyRate} RON</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
