
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockVehicles, mockReservations, mockPayments, mockClients } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, TrendingUp, Calendar, DollarSign, Car } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('monthly');

  // Calculate statistics
  const totalRevenue = mockPayments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const totalReservations = mockReservations.length;
  const utilizationRate = ((mockVehicles.filter(v => v.status === 'rented').length / mockVehicles.length) * 100).toFixed(1);
  
  // Revenue by month (mock data)
  const revenueData = [
    { month: 'Ian', revenue: 15000 },
    { month: 'Feb', revenue: 18000 },
    { month: 'Mar', revenue: 22000 },
    { month: 'Apr', revenue: 19000 },
    { month: 'Mai', revenue: 25000 },
    { month: 'Iun', revenue: 28000 },
  ];

  // Vehicle brand distribution
  const brandData = mockVehicles.reduce((acc, vehicle) => {
    acc[vehicle.brand] = (acc[vehicle.brand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const brandChartData = Object.entries(brandData).map(([brand, count]) => ({
    name: brand,
    value: count
  }));

  // Reservation status distribution
  const statusData = mockReservations.reduce((acc, reservation) => {
    acc[reservation.status] = (acc[reservation.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusChartData = Object.entries(statusData).map(([status, count]) => ({
    name: status,
    value: count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Rapoarte</h1>
          <p className="text-muted-foreground">
            Analize și statistici despre activitatea companiei
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Săptămânal</SelectItem>
              <SelectItem value="monthly">Lunar</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} RON</div>
                <p className="text-sm text-muted-foreground">Venituri Totale</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{totalReservations}</div>
                <p className="text-sm text-muted-foreground">Total Rezervări</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{utilizationRate}%</div>
                <p className="text-sm text-muted-foreground">Rata Utilizare Flotă</p>
              </div>
              <Car className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">+15%</div>
                <p className="text-sm text-muted-foreground">Creștere vs. Luna Trecută</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Evoluția Veniturilor</CardTitle>
            <CardDescription>Venituri pe ultimele 6 luni</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} RON`, 'Venituri']} />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vehicle Brand Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuția Mărcilor</CardTitle>
            <CardDescription>Distribuția vehiculelor pe mărci</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={brandChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {brandChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Reservation Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status Rezervări</CardTitle>
            <CardDescription>Distribuția rezervărilor pe status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Clienți</CardTitle>
            <CardDescription>Clienții cu cele mai multe rezervări</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockClients.slice(0, 5).map((client, index) => {
                const clientReservations = mockReservations.filter(r => r.clientId === client.id).length;
                return (
                  <div key={client.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">{client.email}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{clientReservations} rezervări</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
