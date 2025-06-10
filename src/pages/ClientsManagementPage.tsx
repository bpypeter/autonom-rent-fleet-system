import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClientDetailsModal } from '@/components/ClientDetailsModal';
import { AddClientForm } from '@/components/AddClientForm';
import { EditClientForm } from '@/components/EditClientForm';
import { useClients } from '@/contexts/ClientContext';
import { useReservations } from '@/contexts/ReservationContext';
import { Search, Filter, Eye, Edit, Trash2, Plus, Users } from 'lucide-react';
import { toast } from 'sonner';

export const ClientsManagementPage: React.FC = () => {
  const { clients, updateClient, deleteClient } = useClients();
  const { reservations } = useReservations();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showEditClient, setShowEditClient] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);

  // Function to get client status based on reservations
  const getClientStatus = (clientId: string) => {
    const clientReservations = reservations.filter(res => res.clientId === clientId);
    
    if (clientReservations.length === 0) {
      return 'inactiv';
    }
    
    const hasActiveReservation = clientReservations.some(res => 
      res.status === 'active' || res.status === 'confirmed'
    );
    
    if (hasActiveReservation) {
      return 'activ';
    }
    
    return 'inactiv';
  };

  const filteredClients = clients.filter(client => {
    const clientStatus = getClientStatus(client.id);
    
    const matchesSearch = 
      client.numeComplet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.telefon.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || clientStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (clientId: string) => {
    const status = getClientStatus(clientId);
    
    const variants = {
      activ: 'bg-green-100 text-green-800',
      inactiv: 'bg-gray-100 text-gray-800'
    };

    const labels = {
      activ: 'Activ',
      inactiv: 'Inactiv'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]} variant="secondary">
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const handleViewClient = (client: any) => {
    setSelectedClient(client);
    setShowClientDetails(true);
  };

  const handleEditClient = (client: any) => {
    setEditingClient(client);
    setShowEditClient(true);
  };

  const handleDeleteClient = (client: any) => {
    deleteClient(client.id);
    toast.error(`Clientul ${client.numeComplet} a fost șters`);
  };

  const handleClientUpdated = () => {
    setEditingClient(null);
    setShowEditClient(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestionare Clienți</h1>
          <p className="text-muted-foreground">
            Vizualizați și gestionați clienții înregistrați
          </p>
        </div>
        <Button onClick={() => setShowAddClient(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Adaugă Client
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Clienți ({filteredClients.length})
          </CardTitle>
          <CardDescription>
            Lista clienților înregistrați în sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Căutați după nume, email sau telefon..."
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
                <SelectItem value="activ">Activ</SelectItem>
                <SelectItem value="inactiv">Inactiv</SelectItem>
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

          {/* Mobile Cards View */}
          <div className="block lg:hidden space-y-4">
            {filteredClients.map(client => (
              <Card key={client.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{client.numeComplet}</div>
                      <div className="text-sm text-muted-foreground">{client.email}</div>
                      <div className="text-sm text-muted-foreground">{client.telefon}</div>
                    </div>
                    {getStatusBadge(client.id)}
                  </div>
                  
                  <div className="flex gap-2 pt-2 border-t">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewClient(client)}
                      className="flex-1"
                    >
                      <Eye className="w-3 h-3 mr-2" />
                      Vezi
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditClient(client)}
                      className="flex-1"
                    >
                      <Edit className="w-3 h-3 mr-2" />
                      Editează
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteClient(client)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nume</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Data Înregistrării</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map(client => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.numeComplet}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.telefon}</TableCell>
                    <TableCell>{client.dataInregistrare}</TableCell>
                    <TableCell>{getStatusBadge(client.id)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewClient(client)}
                          title="Vizualizează detalii client"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditClient(client)}
                          title="Editează client"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteClient(client)}
                          title="Șterge client"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredClients.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nu au fost găsiți clienți care să corespundă criteriilor.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <ClientDetailsModal
        client={selectedClient}
        isOpen={showClientDetails}
        onClose={() => {
          setShowClientDetails(false);
          setSelectedClient(null);
        }}
      />

      {showAddClient && (
        <AddClientForm 
          onClose={() => setShowAddClient(false)}
          onClientAdded={() => setShowAddClient(false)}
        />
      )}

      <EditClientForm
        client={editingClient}
        isOpen={showEditClient}
        onClose={() => {
          setShowEditClient(false);
          setEditingClient(null);
        }}
        onClientUpdated={handleClientUpdated}
      />
    </div>
  );
};
