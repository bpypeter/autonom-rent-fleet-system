
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { VehicleDetailsModal } from '@/components/VehicleDetailsModal';
import { mockVehicles } from '@/data/mockData';
import { Search, Filter, Plus, Edit, Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export const FleetManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);

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
      <Badge variant={variants[status as keyof typeof variants]} className="text-xs">
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const handleViewVehicle = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setShowVehicleDetails(true);
  };

  const handleEditVehicle = (vehicle: any) => {
    toast.info(`Editare vehicul ${vehicle.code} - Funcționalitate în dezvoltare`);
  };

  const handleDeleteVehicle = (vehicle: any) => {
    toast.error(`Ștergere vehicul ${vehicle.code} - Funcționalitate în dezvoltare`);
  };

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Administrare Flotă</h1>
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
            Gestionați vehiculele din flotă
          </p>
        </div>
        <Button className="text-xs sm:text-sm flex-shrink-0">
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Adaugă Vehicul
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">{mockVehicles.length}</div>
            <p className="text-xs sm:text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
              {mockVehicles.filter(v => v.status === 'available').length}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Disponibile</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
              {mockVehicles.filter(v => v.status === 'rented').length}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Închiriate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-600">
              {mockVehicles.filter(v => v.status === 'maintenance').length}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Service</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg lg:text-xl">Flota de Vehicule</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Lista completă a vehiculelor din flotă
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          {/* Filters */}
          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3 sm:w-4 sm:h-4" />
              <Input
                placeholder="Căutați vehicule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-xs sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              <Select value={brandFilter} onValueChange={setBrandFilter}>
                <SelectTrigger className="text-xs sm:text-sm">
                  <SelectValue placeholder="Mărcile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate mărcile</SelectItem>
                  {uniqueBrands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="text-xs sm:text-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate</SelectItem>
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
                  className="text-xs sm:text-sm"
                >
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-3">
            {filteredVehicles.map(vehicle => (
              <Card key={vehicle.id} className="p-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">{vehicle.brand} {vehicle.model}</div>
                      <div className="text-xs text-muted-foreground">{vehicle.code}</div>
                    </div>
                    {getStatusBadge(vehicle.status)}
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Număr: {vehicle.licensePlate}</div>
                    <div>An: {vehicle.year} • {vehicle.color}</div>
                    <div>Tarif: {vehicle.dailyRate} RON/zi</div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewVehicle(vehicle)}
                      className="text-xs flex-1"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Vezi
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditVehicle(vehicle)}
                      className="text-xs flex-1"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Cod</TableHead>
                  <TableHead className="text-xs">Vehicul</TableHead>
                  <TableHead className="text-xs">An</TableHead>
                  <TableHead className="text-xs">Număr</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Tarif/zi</TableHead>
                  <TableHead className="text-xs">Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map(vehicle => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium text-xs">{vehicle.code}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-xs">{vehicle.brand} {vehicle.model}</div>
                        <div className="text-xs text-muted-foreground">
                          {vehicle.color} • {vehicle.fuelType}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{vehicle.year}</TableCell>
                    <TableCell className="font-mono text-xs">{vehicle.licensePlate}</TableCell>
                    <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                    <TableCell className="font-medium text-xs">{vehicle.dailyRate} RON</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewVehicle(vehicle)}
                          className="p-1"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditVehicle(vehicle)}
                          className="p-1"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteVehicle(vehicle)}
                          className="p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-8">
              <p className="text-xs sm:text-sm text-muted-foreground">Nu au fost găsite vehicule.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <VehicleDetailsModal
        vehicle={selectedVehicle}
        isOpen={showVehicleDetails}
        onClose={() => {
          setShowVehicleDetails(false);
          setSelectedVehicle(null);
        }}
      />
    </div>
  );
};
