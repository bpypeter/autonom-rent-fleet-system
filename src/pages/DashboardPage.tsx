
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Car, Users, Calendar, CreditCard, TrendingUp, AlertTriangle } from 'lucide-react';
import { mockVehicles } from '@/data/mockData';
import { useClients } from '@/contexts/ClientContext';
import { useReservations } from '@/contexts/ReservationContext';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardPage: React.FC = () => {
  const { clients } = useClients();
  const { reservations } = useReservations();
  const { user } = useAuth();

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

  // Get role-specific dashboard title and description
  const getDashboardContent = () => {
    switch (user?.role) {
      case 'admin':
        return {
          title: 'Dashboard Administrator',
          description: 'Prezentare generală a performanțelor sistemului'
        };
      case 'operator':
        return {
          title: 'Dashboard Operator',
          description: 'Prezentare generală a operațiunilor curente'
        };
      case 'client':
        return {
          title: 'Dashboard Client',
          description: 'Prezentare generală a activității dvs.'
        };
      default:
        return {
          title: 'Dashboard',
          description: 'Prezentare generală'
        };
    }
  };

  const dashboardContent = getDashboardContent();

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

  // Custom tooltip for responsive charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-2 shadow-md text-xs">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name || entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-3 sm:p-4 lg:p-6">
      <div className="space-y-1 sm:space-y-2">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">{dashboardContent.title}</h1>
        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
          {dashboardContent.description}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="space-y-1">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">{mockVehicles.length}</div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-tight">Total Vehicule</p>
              </div>
              <Car className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600 flex-shrink-0" />
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-green-600 text-xs">
                <TrendingUp className="w-2 h-2 mr-1" />
                +5%
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Show clients card only for admin and operator */}
        {(user?.role === 'admin' || user?.role === 'operator') && (
          <Card>
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="space-y-1">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold">{clients.length}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-tight">Total Clienți</p>
                </div>
                <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-600 flex-shrink-0" />
              </div>
              <div className="mt-2">
                <Badge variant="outline" className="text-green-600 text-xs">
                  <TrendingUp className="w-2 h-2 mr-1" />
                  +12%
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="space-y-1">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">{currentMonthReservations}</div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-tight">Rezervări Luna</p>
              </div>
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-600 flex-shrink-0" />
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-green-600 text-xs">
                <TrendingUp className="w-2 h-2 mr-1" />
                +8%
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Show revenue card only for admin and operator */}
        {(user?.role === 'admin' || user?.role === 'operator') && (
          <Card>
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="space-y-1">
                  <div className="text-sm sm:text-lg lg:text-2xl font-bold">{totalRevenue.toLocaleString()}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-tight">Venituri (RON)</p>
                </div>
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-yellow-600 flex-shrink-0" />
              </div>
              <div className="mt-2">
                <Badge variant="outline" className="text-green-600 text-xs">
                  <TrendingUp className="w-2 h-2 mr-1" />
                  +15%
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Charts Row - Show only for admin and operator */}
      {(user?.role === 'admin' || user?.role === 'operator') && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          {/* Monthly Performance Chart */}
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg lg:text-xl">Performanță Lunară</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Rezervări pe ultimele 6 luni</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10 }}
                    interval={0}
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }}
                    width={30}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="rezervari" fill="#3B82F6" name="Rezervări" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Vehicle Status Pie Chart */}
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg lg:text-xl">Status Vehicule</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Distribuția actuală</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={vehicleStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {vehicleStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Activities and Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg lg:text-xl">Activități Recente</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Ultimele acțiuni</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                <div className="text-xs sm:text-sm min-w-0">
                  <span className="font-medium">Ion Popescu</span> a creat o rezervare nouă
                  <div className="text-muted-foreground text-xs">Acum 2 ore</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                <div className="text-xs sm:text-sm min-w-0">
                  <span className="font-medium">Toyota Corolla</span> returnată
                  <div className="text-muted-foreground text-xs">Acum 4 ore</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
                <div className="text-xs sm:text-sm min-w-0">
                  <span className="font-medium">Maria Ionescu</span> client nou
                  <div className="text-muted-foreground text-xs">Ieri</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Show alerts only for admin and operator */}
        {(user?.role === 'admin' || user?.role === 'operator') && (
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" />
                Alerte și Notificări
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">Situații importante</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-xs sm:text-sm font-medium text-yellow-800">
                    2 vehicule necesită service
                  </div>
                  <div className="text-xs text-yellow-600 mt-1">
                    Ford Focus și BMW X3
                  </div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-xs sm:text-sm font-medium text-blue-800">
                    5 rezervări expiră mâine
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    Verificați returnările
                  </div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-xs sm:text-sm font-medium text-green-800">
                    Sistem funcționează normal
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    Toate serviciile OK
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Show simplified content for clients */}
        {user?.role === 'client' && (
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg lg:text-xl">Rezervările Mele</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Statusul rezervărilor</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-xs sm:text-sm font-medium text-blue-800">
                    Rezervare activă
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    Toyota Corolla - până pe 15 Iunie
                  </div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-xs sm:text-sm font-medium text-green-800">
                    Ultimele rezervări finalizate cu succes
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    2 rezervări în ultima lună
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
