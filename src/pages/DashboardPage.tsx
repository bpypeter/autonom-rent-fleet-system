
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Car, Users, Calendar, CreditCard, TrendingUp, AlertTriangle } from 'lucide-react';
import { mockVehicles } from '@/data/mockData';
import { useClients } from '@/contexts/ClientContext';
import { useReservations } from '@/contexts/ReservationContext';

export const DashboardPage: React.FC = () => {
  const { clients } = useClients();
  const { reservations } = useReservations();

  // Calculate current month reservations using context data
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const currentMonthReservations = reservations.filter(reservation => {
    const reservationDate = new Date(reservation.startDate);
    return reservationDate.getMonth() === currentMonth && reservationDate.getFullYear() === currentYear;
  }).length;

  const totalRevenue = reservations
    .filter(reservation => {
      const reservationDate = new Date(reservation.startDate);
      return reservationDate.getMonth() === currentMonth && reservationDate.getFullYear() === currentYear;
    })
    .reduce((sum, r) => sum + r.totalAmount, 0);

  // Mock data pentru dashboard
  const monthlyData = [
    { name: 'Ian', rezervari: 45, venituri: 15000 },
    { name: 'Feb', rezervari: 52, venituri: 18000 },
    { name: 'Mar', rezervari: 48, venituri: 16500 },
    { name: 'Apr', rezervari: 61, venituri: 21000 },
    { name: 'Mai', rezervari: 55, venituri: 19000 },
    { name: 'Iun', rezervari: currentMonthReservations, venituri: totalRevenue }
  ];

  const vehicleStatusData = [
    { name: 'Disponibile', value: mockVehicles.filter(v => v.status === 'available').length, color: '#10B981' },
    { name: 'Închiriate', value: mockVehicles.filter(v => v.status === 'rented').length, color: '#3B82F6' },
    { name: 'Service', value: mockVehicles.filter(v => v.status === 'maintenance').length, color: '#F59E0B' },
    { name: 'Inactive', value: mockVehicles.filter(v => v.status === 'inactive').length, color: '#6B7280' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Administrator</h1>
        <p className="text-muted-foreground">
          Prezentare generală a performanțelor sistemului
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{mockVehicles.length}</div>
                <p className="text-sm text-muted-foreground">Total Vehicule</p>
              </div>
              <Car className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +5% vs luna trecută
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{clients.length}</div>
                <p className="text-sm text-muted-foreground">Total Clienți</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% vs luna trecută
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{currentMonthReservations}</div>
                <p className="text-sm text-muted-foreground">Rezervări Luna Curentă</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8% vs luna trecută
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{totalRevenue.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Venituri Luna (RON)</p>
              </div>
              <CreditCard className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15% vs luna trecută
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performanță Lunară</CardTitle>
            <CardDescription>Rezervări și venituri pe ultimele 6 luni</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rezervari" fill="#3B82F6" name="Rezervări" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vehicle Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Status Vehicule</CardTitle>
            <CardDescription>Distribuția actuală a statutului vehiculelor</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vehicleStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {vehicleStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activități Recente</CardTitle>
            <CardDescription>Ultimele acțiuni din sistem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-sm">
                  <span className="font-medium">Ion Popescu</span> a creat o rezervare nouă
                  <div className="text-muted-foreground text-xs">Acum 2 ore</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="text-sm">
                  <span className="font-medium">Toyota Corolla (B-123-ABC)</span> a fost returnată
                  <div className="text-muted-foreground text-xs">Acum 4 ore</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="text-sm">
                  <span className="font-medium">Maria Ionescu</span> s-a înregistrat ca client nou
                  <div className="text-muted-foreground text-xs">Ieri</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Alerte și Notificări
            </CardTitle>
            <CardDescription>Situații care necesită atenție</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-sm font-medium text-yellow-800">
                  2 vehicule necesită service programat
                </div>
                <div className="text-xs text-yellow-600 mt-1">
                  Ford Focus și BMW X3 au depășit kilometrajul pentru service
                </div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-800">
                  5 rezervări expiră mâine
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  Verificați returnările programate pentru 02.12.2024
                </div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm font-medium text-green-800">
                  Sistem funcționează normal
                </div>
                <div className="text-xs text-green-600 mt-1">
                  Toate serviciile sunt operaționale
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
