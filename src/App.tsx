
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { ReservationProvider } from '@/contexts/ReservationContext';
import { ClientProvider } from '@/contexts/ClientContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { Layout } from '@/components/Layout';
import Index from '@/pages/Index';
import LoginPage from '@/pages/LoginPage';
import { VehiclesPage } from '@/pages/VehiclesPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { AllReservationsPage } from '@/pages/AllReservationsPage';
import { FleetManagementPage } from '@/pages/FleetManagementPage';
import { PaymentsPage } from '@/pages/PaymentsPage';
import { ClientsManagementPage } from '@/pages/ClientsManagementPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { MyReservationsPage } from '@/pages/MyReservationsPage';
import { VehicleReturnsPage } from '@/pages/VehicleReturnsPage';
import { HistoryPage } from '@/pages/HistoryPage';
import { FeedbackPage } from '@/pages/FeedbackPage';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReservationProvider>
          <ClientProvider>
            <SidebarProvider>
              <Router>
                <div className="min-h-screen flex w-full">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/*" element={
                      <Layout>
                        <Routes>
                          <Route path="/dashboard" element={<DashboardPage />} />
                          <Route path="/vehicles" element={<VehiclesPage />} />
                          <Route path="/reservations" element={<MyReservationsPage />} />
                          <Route path="/all-reservations" element={<AllReservationsPage />} />
                          <Route path="/fleet" element={<FleetManagementPage />} />
                          <Route path="/returns" element={<VehicleReturnsPage />} />
                          <Route path="/clients" element={<ClientsManagementPage />} />
                          <Route path="/payments" element={<PaymentsPage />} />
                          <Route path="/reports" element={<ReportsPage />} />
                          <Route path="/settings" element={<SettingsPage />} />
                          <Route path="/history" element={<HistoryPage />} />
                          <Route path="/feedback" element={<FeedbackPage />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </Layout>
                    } />
                  </Routes>
                </div>
                <Toaster />
              </Router>
            </SidebarProvider>
          </ClientProvider>
        </ReservationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
