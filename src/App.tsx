
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { LoginForm } from '@/components/LoginForm';
import { VehiclesPage } from '@/pages/VehiclesPage';
import { DashboardPage } from '@/pages/DashboardPage';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Redirect to appropriate dashboard based on role
  const getDefaultRoute = () => {
    switch (user?.role) {
      case 'admin':
        return '/dashboard';
      case 'operator':
        return '/fleet';
      case 'client':
        return '/vehicles';
      default:
        return '/vehicles';
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
      <Route path="/login" element={<Navigate to={getDefaultRoute()} replace />} />
      
      {/* Client Routes */}
      <Route 
        path="/vehicles" 
        element={
          <ProtectedRoute allowedRoles={['client', 'operator', 'admin']}>
            <VehiclesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reservations" 
        element={
          <ProtectedRoute allowedRoles={['client', 'operator', 'admin']}>
            <div className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Rezervările Mele</h1>
              <p className="text-muted-foreground">Această pagină va fi implementată în curând.</p>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/history" 
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <div className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Istoricul Rezervărilor</h1>
              <p className="text-muted-foreground">Această pagină va fi implementată în curând.</p>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/feedback" 
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <div className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Feedback</h1>
              <p className="text-muted-foreground">Această pagină va fi implementată în curând.</p>
            </div>
          </ProtectedRoute>
        } 
      />

      {/* Operator Routes */}
      <Route 
        path="/fleet" 
        element={
          <ProtectedRoute allowedRoles={['operator', 'admin']}>
            <VehiclesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/returns" 
        element={
          <ProtectedRoute allowedRoles={['operator', 'admin']}>
            <div className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Returnări Vehicule</h1>
              <p className="text-muted-foreground">Această pagină va fi implementată în curând.</p>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/clients" 
        element={
          <ProtectedRoute allowedRoles={['operator', 'admin']}>
            <div className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Gestionare Clienți</h1>
              <p className="text-muted-foreground">Această pagină va fi implementată în curând.</p>
            </div>
          </ProtectedRoute>
        } 
      />

      {/* Admin Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/all-reservations" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <div className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Toate Rezervările</h1>
              <p className="text-muted-foreground">Această pagină va fi implementată în curând.</p>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/payments" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <div className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Gestionare Plăți</h1>
              <p className="text-muted-foreground">Această pagină va fi implementată în curând.</p>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <div className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Rapoarte</h1>
              <p className="text-muted-foreground">Această pagină va fi implementată în curând.</p>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <div className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Setări Sistem</h1>
              <p className="text-muted-foreground">Această pagină va fi implementată în curând.</p>
            </div>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/unauthorized" 
        element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">403</h1>
              <p className="text-xl text-muted-foreground mb-4">Acces interzis</p>
              <p className="text-muted-foreground">Nu aveți permisiunile necesare pentru a accesa această pagină.</p>
            </div>
          </div>
        } 
      />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
