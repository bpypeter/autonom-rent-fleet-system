
import React, { useState } from 'react';
import { mockVehicles } from '@/data/mockData';
import { Vehicle } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter } from 'lucide-react';

interface VehiclesTableProps {
  onSelectVehicle?: (vehicle: Vehicle) => void;
  showAvailableOnly?: boolean;
}

export const VehiclesTable: React.FC<VehiclesTableProps> = ({ 
  onSelectVehicle, 
  showAvailableOnly = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBrand = brandFilter === 'all' || vehicle.brand === brandFilter;
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    const matchesAvailable = !showAvailableOnly || vehicle.status === 'available';

    return matchesSearch && matchesBrand && matchesStatus && matchesAvailable;
  });

  const uniqueBrands = [...new Set(mockVehicles.map(v => v.brand))];

  const getStatusBadge = (status: Vehicle['status']) => {
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
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicule Disponibile</CardTitle>
        <CardDescription>
          Găsiți vehiculul perfect pentru nevoile dumneavoastră
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Căutați după marcă, model sau număr..."
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
          {!showAvailableOnly && (
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
          )}
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
                {onSelectVehicle && <TableHead>Acțiuni</TableHead>}
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
                  {onSelectVehicle && (
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => onSelectVehicle(vehicle)}
                        disabled={vehicle.status !== 'available'}
                      >
                        Selectează
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nu au fost găsite vehicule care să corespundă criteriilor.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
