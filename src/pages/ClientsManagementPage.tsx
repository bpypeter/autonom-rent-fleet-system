
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestionare Clienți</h1>
          <p className="text-muted-foreground">
            Vizualizați și gestionați clienții înregistrați
          </p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-2" />
          {showAddForm ? 'Anulează' : 'Adaugă Client'}
        </Button>
      </div>

      {showAddForm && (
        <AddClientForm 
          onClientAdded={() => setShowAddForm(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{clients.length}</div>
                <p className="text-sm text-muted-foreground">Total Clienți</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {clients.filter(c => c.rezervariActive > 0).length}
            </div>
            <p className="text-sm text-muted-foreground">Clienți Activi</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">
              {clients.reduce((sum, c) => sum + c.totalRezervari, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Rezervări</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista Clienților</CardTitle>
          <CardDescription>
            Toate informațiile despre clienții înregistrați
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Căutați după nume, email sau telefon..."
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
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Rezervări</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data Înregistrare</TableHead>
                  <TableHead>Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map(client => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{client.numeComplet}</div>
                        <div className="text-sm text-muted-foreground">CNP: {client.cnp}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="w-3 h-3" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="w-3 h-3" />
                          {client.telefon}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Total: {client.totalRezervari}</div>
                        <div className="text-muted-foreground">Active: {client.rezervariActive}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={client.rezervariActive > 0 ? "default" : "secondary"}>
                        {client.rezervariActive > 0 ? "Client Activ" : "Inactiv"}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.dataInregistrare}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewClient(client)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
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
              <p className="text-muted-foreground">Nu au fost găsiți clienți care să corespundă criteriilor.</p>
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
