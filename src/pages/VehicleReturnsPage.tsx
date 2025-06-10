import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, CheckCircle, AlertCircle, Truck, FileText, ChevronDown } from 'lucide-react';
import { VehicleConditionFormModal } from '@/components/documents/VehicleConditionFormModal';
import { KeyReturnProofModal } from '@/components/documents/KeyReturnProofModal';
import { HandoverReportModal } from '@/components/documents/HandoverReportModal';

export const VehicleReturnsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicleConditionModal, setVehicleConditionModal] = useState<{
    isOpen: boolean;
    data: any;
  }>({ isOpen: false, data: null });
  const [keyReturnModal, setKeyReturnModal] = useState<{
    isOpen: boolean;
    data: any;
  }>({ isOpen: false, data: null });
  const [handoverModal, setHandoverModal] = useState<{
    isOpen: boolean;
    data: any;
  }>({ isOpen: false, data: null });

  // Mock data pentru returnări
  const mockReturns = [
    {
      id: '1',
      reservationCode: 'REZ20241201-001',
      vehicleBrand: 'Toyota',
      vehicleModel: 'Corolla',
      licensePlate: 'B-123-ABC',
      clientName: 'Ion Popescu',
      returnDate: '2024-12-01',
      status: 'pending',
      notes: 'Vehicul în stare bună'
    },
    {
      id: '2',
      reservationCode: 'REZ20241130-002',
      vehicleBrand: 'Ford',
      vehicleModel: 'Focus',
      licensePlate: 'B-456-DEF',
      clientName: 'Maria Ionescu',
      returnDate: '2024-11-30',
      status: 'completed',
      notes: 'Returnare finalizată'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800'
    };

    const labels = {
      pending: 'În așteptare',
      completed: 'Finalizată',
      overdue: 'Întârziat'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]} variant="secondary">
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const openVehicleConditionModal = (returnItem: any) => {
    setVehicleConditionModal({ isOpen: true, data: returnItem });
  };

  const openKeyReturnModal = (returnItem: any) => {
    setKeyReturnModal({ isOpen: true, data: returnItem });
  };

  const openHandoverModal = (returnItem: any) => {
    setHandoverModal({ isOpen: true, data: returnItem });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Returnări Vehicule</h1>
          <p className="text-muted-foreground">
            Gestionați returnarea vehiculelor închiriate
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">2</div>
                <p className="text-sm text-muted-foreground">Total Returnări</p>
              </div>
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <p className="text-sm text-muted-foreground">În Așteptare</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">1</div>
            <p className="text-sm text-muted-foreground">Finalizate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">0</div>
            <p className="text-sm text-muted-foreground">Întârziate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista Returnărilor</CardTitle>
          <CardDescription>
            Toate returnările de vehicule programate și finalizate
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
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cod Rezervare</TableHead>
                  <TableHead>Vehicul</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Data Returnare</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Documente</TableHead>
                  <TableHead>Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReturns.map(returnItem => (
                  <TableRow key={returnItem.id}>
                    <TableCell className="font-medium">{returnItem.reservationCode}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{returnItem.vehicleBrand} {returnItem.vehicleModel}</div>
                        <div className="text-sm text-muted-foreground">{returnItem.licensePlate}</div>
                      </div>
                    </TableCell>
                    <TableCell>{returnItem.clientName}</TableCell>
                    <TableCell>{returnItem.returnDate}</TableCell>
                    <TableCell>{getStatusBadge(returnItem.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-1" />
                            Documente
                            <ChevronDown className="w-4 h-4 ml-1" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64">
                          <DropdownMenuItem onClick={() => openVehicleConditionModal(returnItem)}>
                            <FileText className="w-4 h-4 mr-2" />
                            Fișa stare vehicul la returnare
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openKeyReturnModal(returnItem)}>
                            <FileText className="w-4 h-4 mr-2" />
                            Dovadă de restituire cheie/documente
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openHandoverModal(returnItem)}>
                            <FileText className="w-4 h-4 mr-2" />
                            Proces-verbal de predare-primire vehicul
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {returnItem.status === 'pending' ? (
                          <Button size="sm" variant="outline">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Finalizează
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Detalii
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {vehicleConditionModal.data && (
        <VehicleConditionFormModal
          isOpen={vehicleConditionModal.isOpen}
          onClose={() => setVehicleConditionModal({ isOpen: false, data: null })}
          reservationCode={vehicleConditionModal.data.reservationCode}
          vehicleBrand={vehicleConditionModal.data.vehicleBrand}
          vehicleModel={vehicleConditionModal.data.vehicleModel}
          licensePlate={vehicleConditionModal.data.licensePlate}
          clientName={vehicleConditionModal.data.clientName}
        />
      )}

      {keyReturnModal.data && (
        <KeyReturnProofModal
          isOpen={keyReturnModal.isOpen}
          onClose={() => setKeyReturnModal({ isOpen: false, data: null })}
          reservationCode={keyReturnModal.data.reservationCode}
          vehicleBrand={keyReturnModal.data.vehicleBrand}
          vehicleModel={keyReturnModal.data.vehicleModel}
          licensePlate={keyReturnModal.data.licensePlate}
          clientName={keyReturnModal.data.clientName}
        />
      )}

      {handoverModal.data && (
        <HandoverReportModal
          isOpen={handoverModal.isOpen}
          onClose={() => setHandoverModal({ isOpen: false, data: null })}
          reservationCode={handoverModal.data.reservationCode}
          vehicleBrand={handoverModal.data.vehicleBrand}
          vehicleModel={handoverModal.data.vehicleModel}
          licensePlate={handoverModal.data.licensePlate}
          clientName={handoverModal.data.clientName}
        />
      )}
    </div>
  );
};
