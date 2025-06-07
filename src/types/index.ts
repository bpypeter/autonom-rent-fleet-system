
export interface User {
  id: string;
  username: string;
  password: string;
  role: 'client' | 'operator' | 'admin';
  email: string;
  name: string;
  phone: string;
}

export interface Client {
  id: string;
  code: string; // CLI-XXX format
  name: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  dateOfBirth: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  code: string; // VEH-XXX format
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  fuelType: string;
  transmission: string;
  seats: number;
  dailyRate: number;
  status: 'available' | 'rented' | 'maintenance' | 'inactive';
  mileage: number;
  lastService: string;
  createdAt: string;
}

export interface Reservation {
  id: string;
  code: string; // REZ20240615-001 format
  clientId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  dailyRate: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Payment {
  id: string;
  code: string; // PLT-REZxxxx format
  reservationId: string;
  amount: number;
  method: 'card' | 'cash' | 'transfer';
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface VehicleReturn {
  id: string;
  reservationId: string;
  returnDate: string;
  mileage: number;
  fuelLevel: number;
  condition: string;
  damages: string;
  photos: string[];
  reportCode?: string; // DAU-XXX for damage reports
  createdAt: string;
}

export interface Feedback {
  id: string;
  code: string; // FBK-CLIxxx format
  reservationId: string;
  clientId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
