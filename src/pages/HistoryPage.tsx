
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockReservations, mockVehicles, mockPayments } from '@/data/mockData';
import { Search, Filter, Download, Star, Receipt } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');

  // For demo purposes, we'll show completed reservations. In a real app, you'd filter by user.id
  const completedReservations = mockReservations.filter(r => r.status === 'completed');

  const filteredReservations = completedReservations.filter(reservation => {
    const vehicle = mockVehicles.find(v => v.id === reservation.vehicleId);
    const reservationYear = new Date(reservation.startDate).getFullYear().toString();
    
    const matchesSearch = 
      reservation.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle?.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle?.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = yearFilter === 'all' || reservationYear === yearFilter;
    
    return matchesSearch && matchesYear;
  });

  const years = ['2024', '2023', '2022'];
  const totalSpent = filteredReservations.reduce((sum, r) => sum + r.totalAmount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Istoricul Rezervărilor</h1>
        <p className="text-muted-foreground">
          Vizualizați istoricul complet al rezervărilor dumneavoastră
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{completedReservations.length}</div>
            <p className="text-sm text-muted-foreground">Rezervări Finalizate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{totalSpent.toLocaleString()} RON</div>
            <p className="text-sm text-muted-foreground">Total Cheltuit</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {Math.round(totalSpent / completedReservations.length || 0)} RON
            </div>
            <p className="text-sm text-muted-foreground">Media per Rezervare</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-sm text-muted-foreground">Rating Mediu</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Istoricul Complet</CardTitle>
          <CardDescription>
            Toate rezervările finalizate cu detalii complete
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Căutați după cod rezervare sau vehicul..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Toate anii" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toți anii</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            {(searchTerm || yearFilter !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setYearFilter('all');
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
                  <TableHead>Rezervare</TableHead>
                  <TableHead>Vehicul</TableHead>
                  <TableHead>Perioada</TableHead>
                  <TableHead>Cost Total</TableHead>
                  <TableHead>Plată</TableHead>
                  <TableHead>Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map(reservation => {
                  const vehicle = mockVehicles.find(v => v.id === reservation.vehicleId);
                  const payment = mockPayments.find(p => p.reservationId === reservation.id);
                  
                  return (
                    <TableRow key={reservation.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{reservation.code}</div>
                          <div className="text-sm text-muted-foreground">
                            Creat: {reservation.createdAt}
                          </div>
                        </div>
                      </TableCell>
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
                      <TableCell>
                        {payment && (
                          <Badge variant="outline">
                            {payment.method === 'card' ? 'Card' : 
                             payment.method === 'cash' ? 'Numerar' : 'Transfer'}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Receipt className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Star className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredReservations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nu aveți rezervări finalizate care să corespundă criteriilor.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
