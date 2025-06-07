
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockVehicles, mockReservations, mockPayments, mockClients } from '@/data/mockData';
import { Car, Calendar, CreditCard, Users, TrendingUp, AlertTriangle } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  // Calculate statistics
  const totalVehicles = mockVehicles.length;
  const availableVehicles = mockVehicles.filter(v => v.status === 'available').length;
  const rentedVehicles = mockVehicles.filter(v => v.status === 'rented').length;
  const maintenanceVehicles = mockVehicles.filter(v => v.status === 'maintenance').length;

  const totalReservations = mockReservations.length;
  const activeReservations = mockReservations.filter(r => r.status === 'active').length;
  const pendingReservations = mockReservations.filter(r => r.status === 'pending').length;

  const totalRevenue = mockPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalClients = mockClients.length;

  const stats = [
    {
      title: 'Total Vehicule',
      value: totalVehicles,
      description: `${availableVehicles} disponibile`,
      icon: Car,
      color: 'text-blue-600'
    },
    {
      title: 'Rezervări Active',
      value: activeReservations,
      description: `${pendingReservations} în așteptare`,
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      title: 'Venituri Totale',
      value: `${totalRevenue.toLocaleString()} RON`,
      description: 'Luna aceasta',
      icon: CreditCard,
      color: 'text-purple-600'
    },
    {
      title: 'Clienți Înregistrați',
      value: totalClients,
      description: 'Baza de date',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  const fleetStatus = [
    { status: 'Disponibile', count: availableVehicles, color: 'bg-green-500' },
    { status: 'Închiriate', count: rentedVehicles, color: 'bg-blue-500' },
    { status: 'Service', count: maintenanceVehicles, color: 'bg-yellow-500' },
    { status: 'Inactive', count: mockVehicles.filter(v => v.status === 'inactive').length, color: 'bg-gray-500' }
  ];

  const recentReservations = mockReservations
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Administrator</h1>
        <p className="text-muted-foreground">
          Privire de ansamblu asupra activității AUTONOM
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fleet Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5" />
              Status Flotă
            </CardTitle>
            <CardDescription>
              Distribuția vehiculelor pe statusuri
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fleetStatus.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium">{item.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{item.count} vehicule</span>
                    <span className="text-xs text-muted-foreground">
                      ({((item.count / totalVehicles) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reservations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Rezervări Recente
            </CardTitle>
            <CardDescription>
              Ultimele {recentReservations.length} rezervări create
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReservations.map((reservation) => {
                const client = mockClients.find(c => c.id === reservation.clientId);
                const vehicle = mockVehicles.find(v => v.id === reservation.vehicleId);
                
                const statusColors = {
                  pending: 'bg-yellow-100 text-yellow-800',
                  confirmed: 'bg-blue-100 text-blue-800',
                  active: 'bg-green-100 text-green-800',
                  completed: 'bg-gray-100 text-gray-800',
                  cancelled: 'bg-red-100 text-red-800'
                };

                return (
                  <div key={reservation.id} className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{reservation.code}</p>
                      <p className="text-xs text-muted-foreground">
                        {client?.name} • {vehicle?.brand} {vehicle?.model}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {reservation.startDate} - {reservation.endDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={statusColors[reservation.status]} variant="secondary">
                        {reservation.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {reservation.totalAmount} RON
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            Alerte și Notificări
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Vehicule în service</p>
                <p className="text-xs text-muted-foreground">
                  {maintenanceVehicles} vehicule necesită atenție
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Calendar className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Rezervări în așteptare</p>
                <p className="text-xs text-muted-foreground">
                  {pendingReservations} rezervări așteaptă confirmare
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Performanță bună</p>
                <p className="text-xs text-muted-foreground">
                  Rata de utilizare a flotei: {((rentedVehicles / totalVehicles) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
