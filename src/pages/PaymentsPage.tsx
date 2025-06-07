
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { InvoiceModal } from '@/components/InvoiceModal';
import { mockPayments, mockReservations, mockClients } from '@/data/mockData';
import { Search, Filter, Download, CreditCard, DollarSign, TrendingUp, FileText, Eye } from 'lucide-react';

export const PaymentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

  const filteredPayments = mockPayments.filter(payment => {
    const reservation = mockReservations.find(r => r.id === payment.reservationId);
    const client = mockClients.find(c => c.id === reservation?.clientId);
    
    const matchesSearch = 
      payment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation?.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalAmount = mockPayments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = mockPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-blue-100 text-blue-800'
    };

    const labels = {
      pending: 'În așteptare',
      completed: 'Finalizată',
      failed: 'Eșuată',
      refunded: 'Rambursată'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]} variant="secondary">
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getMethodBadge = (method: string) => {
    const labels = {
      card: 'Card',
      cash: 'Numerar',
      transfer: 'Transfer'
    };

    return (
      <Badge variant="outline">
        {labels[method as keyof typeof labels]}
      </Badge>
    );
  };

  const handleViewInvoice = (payment: any) => {
    const reservation = mockReservations.find(r => r.id === payment.reservationId);
    const client = mockClients.find(c => c.id === reservation?.clientId);
    
    const invoice = {
      id: payment.id,
      number: `INV-${payment.code}`,
      clientName: client?.name || 'Client Necunoscut',
      amount: payment.amount,
      date: payment.createdAt,
      reservationCode: reservation?.code || 'N/A'
    };
    
    setSelectedInvoice(invoice);
    setShowInvoice(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestionare Plăți</h1>
          <p className="text-muted-foreground">
            Vizualizați și gestionați toate plățile
          </p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Raport
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{totalAmount.toLocaleString()} RON</div>
                <p className="text-sm text-muted-foreground">Total Încasat</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{pendingAmount.toLocaleString()} RON</div>
                <p className="text-sm text-muted-foreground">În Așteptare</p>
              </div>
              <CreditCard className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{mockPayments.filter(p => p.status === 'completed').length}</div>
            <p className="text-sm text-muted-foreground">Plăți Finalizate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">+12%</div>
                <p className="text-sm text-muted-foreground">vs. Luna Trecută</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Istoric Plăți</CardTitle>
          <CardDescription>
            Lista completă a plăților din sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Căutați după cod plată, client sau rezervare..."
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
                <SelectItem value="pending">În așteptare</SelectItem>
                <SelectItem value="completed">Finalizată</SelectItem>
                <SelectItem value="failed">Eșuată</SelectItem>
                <SelectItem value="refunded">Rambursată</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Metoda de plată" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate metodele</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="cash">Numerar</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>
            {(searchTerm || statusFilter !== 'all' || methodFilter !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setMethodFilter('all');
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
                  <TableHead>Cod Plată</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Rezervare</TableHead>
                  <TableHead>Sumă</TableHead>
                  <TableHead>Metodă</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map(payment => {
                  const reservation = mockReservations.find(r => r.id === payment.reservationId);
                  const client = mockClients.find(c => c.id === reservation?.clientId);
                  
                  return (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.code}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{client?.name}</div>
                          <div className="text-sm text-muted-foreground">{client?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-sm">{reservation?.code}</div>
                      </TableCell>
                      <TableCell className="font-medium">{payment.amount} RON</TableCell>
                      <TableCell>{getMethodBadge(payment.method)}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>{payment.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewInvoice(payment)}>
                            <FileText className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <InvoiceModal
        invoice={selectedInvoice}
        isOpen={showInvoice}
        onClose={() => {
          setShowInvoice(false);
          setSelectedInvoice(null);
        }}
      />
    </div>
  );
};
