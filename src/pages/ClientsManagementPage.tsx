
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AddClientForm } from '@/components/AddClientForm';
import { ClientDetailsModal } from '@/components/ClientDetailsModal';
import { useClients } from '@/contexts/ClientContext';
import { Search, Filter, Plus, Eye, Edit, Phone, Mail, Users } from 'lucide-react';

export const ClientsManagementPage: React.FC = () => {
  const { clients } = useClients();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientDetails, setShowClientDetails] = useState(false);

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.numeComplet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.telefon.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const handleViewClient = (client: any) => {
    setSelectedClient(client);
    setShowClientDetails(true);
  };

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Gestionare Clienți</h1>
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
            Vizualizați și gestionați clienții înregistrați
          </p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="text-xs sm:text-sm flex-shrink-0">
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          {showAddForm ? 'Anulează' : 'Adaugă Client'}
        </Button>
      </div>

      {showAddForm && (
        <AddClientForm 
          onClientAdded={() => setShowAddForm(false)}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">{clients.length}</div>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Clienți</p>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
              {clients.filter(c => c.rezervariActive > 0).length}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Clienți Activi</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
              {clients.reduce((sum, c) => sum + c.totalRezervari, 0)}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Total Rezervări</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg lg:text-xl">Lista Clienților</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Toate informațiile despre clienții înregistrați
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3 sm:w-4 sm:h-4" />
              <Input
                placeholder="Căutați după nume, email sau telefon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-xs sm:text-sm"
              />
            </div>
            {searchTerm && (
              <Button
                variant="outline"
                onClick={() => setSearchTerm('')}
                className="text-xs sm:text-sm"
              >
                <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Reset
              </Button>
            )}
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-3">
            {filteredClients.map(client => (
              <Card key={client.id} className="p-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">{client.numeComplet}</div>
                      <div className="text-xs text-muted-foreground">CNP: {client.cnp}</div>
                    </div>
                    <Badge variant={client.rezervariActive > 0 ? "default" : "secondary"} className="text-xs">
                      {client.rezervariActive > 0 ? "Activ" : "Inactiv"}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs">
                      <Mail className="w-3 h-3" />
                      {client.email}
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Phone className="w-3 h-3" />
                      {client.telefon}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div>Total: {client.totalRezervari} | Active: {client.rezervariActive}</div>
                    <div>Înregistrat: {client.dataInregistrare}</div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewClient(client)} className="text-xs flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      Vezi
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs flex-1">
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
                  <TableHead className="text-xs">Client</TableHead>
                  <TableHead className="text-xs">Contact</TableHead>
                  <TableHead className="text-xs">Rezervări</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Data Înregistrare</TableHead>
                  <TableHead className="text-xs">Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map(client => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-xs">{client.numeComplet}</div>
                        <div className="text-xs text-muted-foreground">CNP: {client.cnp}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Mail className="w-3 h-3" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Phone className="w-3 h-3" />
                          {client.telefon}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <div>Total: {client.totalRezervari}</div>
                        <div className="text-muted-foreground">Active: {client.rezervariActive}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={client.rezervariActive > 0 ? "default" : "secondary"} className="text-xs">
                        {client.rezervariActive > 0 ? "Client Activ" : "Inactiv"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">{client.dataInregistrare}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="outline" onClick={() => handleViewClient(client)} className="p-1">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="p-1">
                          <Edit className="w-3 h-3" />
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
              <p className="text-xs sm:text-sm text-muted-foreground">Nu au fost găsiți clienți care să corespundă criteriilor.</p>
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
    </div>
  );
};
