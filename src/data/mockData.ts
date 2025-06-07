
import { Client, Vehicle, Reservation, Payment, Feedback, VehicleReturn } from '@/types';

// Generate code function
const generateCode = (prefix: string, counter: number, date?: string): string => {
  if (prefix === 'REZ' && date) {
    return `${prefix}${date}-${String(counter).padStart(3, '0')}`;
  }
  return `${prefix}-${String(counter).padStart(3, '0')}`;
};

// Generate 40 clients
export const mockClients: Client[] = Array.from({ length: 40 }, (_, i) => {
  const names = [
    'Ion Popescu', 'Maria Ionescu', 'Alexandru Gheorghe', 'Elena Radu', 'Mihai Stoica',
    'Ana Dumitru', 'George Popa', 'Cristina Manea', 'Adrian Constantinescu', 'Raluca Diaconu',
    'Bogdan Marinescu', 'Ioana Stefanescu', 'Catalin Moldovan', 'Andreea Nicolaescu', 'Florin Tudor',
    'Carmen Vasilescu', 'Daniel Ene', 'Gabriela Barbu', 'Radu Munteanu', 'Monica Ungureanu',
    'Victor Neagu', 'Diana Tanase', 'Stefan Badea', 'Laura Preda', 'Marius Anghelescu',
    'Alina Cristea', 'Ciprian Lupu', 'Silvia Mocanu', 'Razvan Iancu', 'Oana Nistor',
    'Andrei Sandu', 'Corina Ciobanu', 'Lucian Stan', 'Bianca Zamfir', 'Vlad Enache',
    'Simona Paun', 'Gabriel Serban', 'Claudia Dinu', 'Robert Vlaicu', 'Roxana Apostol'
  ];
  
  const name = names[i] || `Client ${i + 1}`;
  const email = `${name.toLowerCase().replace(/\s+/g, '.')}@email.com`;
  
  return {
    id: `client_${i + 1}`,
    code: generateCode('CLI', i + 1),
    name,
    email,
    phone: `072${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`,
    address: `Strada ${['Victoriei', 'Unirii', 'Libertății', 'Mihai Viteazu', 'Stefan cel Mare'][i % 5]} nr. ${i + 1}, București`,
    licenseNumber: `B${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`,
    dateOfBirth: `198${Math.floor(Math.random() * 9)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString()
  };
});

// Generate 30 vehicles
export const mockVehicles: Vehicle[] = Array.from({ length: 30 }, (_, i) => {
  const brands = ['Dacia', 'Renault', 'BMW', 'Audi', 'Mercedes', 'Volkswagen', 'Ford', 'Toyota', 'Hyundai', 'Skoda'];
  const models = {
    'Dacia': ['Logan', 'Sandero', 'Duster', 'Spring'],
    'Renault': ['Clio', 'Megane', 'Captur', 'Kadjar'],
    'BMW': ['Seria 3', 'Seria 5', 'X1', 'X3'],
    'Audi': ['A3', 'A4', 'Q3', 'Q5'],
    'Mercedes': ['Clasa A', 'Clasa C', 'GLA', 'GLC'],
    'Volkswagen': ['Golf', 'Passat', 'Tiguan', 'T-Cross'],
    'Ford': ['Focus', 'Mondeo', 'Kuga', 'EcoSport'],
    'Toyota': ['Corolla', 'Camry', 'RAV4', 'C-HR'],
    'Hyundai': ['i20', 'i30', 'Tucson', 'Kona'],
    'Skoda': ['Fabia', 'Octavia', 'Karoq', 'Kodiaq']
  };
  
  const brand = brands[i % brands.length];
  const model = models[brand][Math.floor(Math.random() * models[brand].length)];
  const colors = ['Alb', 'Negru', 'Gri', 'Albastru', 'Roșu', 'Verde', 'Argintiu'];
  const statuses: Vehicle['status'][] = ['available', 'rented', 'maintenance', 'inactive'];
  
  return {
    id: `vehicle_${i + 1}`,
    code: generateCode('VEH', i + 1),
    brand,
    model,
    year: 2018 + Math.floor(Math.random() * 6),
    licensePlate: `B${String(Math.floor(Math.random() * 100)).padStart(2, '0')}ABC`,
    color: colors[Math.floor(Math.random() * colors.length)],
    fuelType: ['Benzină', 'Diesel', 'Hibrid', 'Electric'][Math.floor(Math.random() * 4)],
    transmission: Math.random() > 0.3 ? 'Manuală' : 'Automată',
    seats: [2, 4, 5, 7][Math.floor(Math.random() * 4)],
    dailyRate: 50 + Math.floor(Math.random() * 200),
    status: i < 20 ? 'available' : statuses[Math.floor(Math.random() * statuses.length)],
    mileage: 10000 + Math.floor(Math.random() * 100000),
    lastService: new Date(2024, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1).toISOString(),
    createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString()
  };
});

// Generate 15 reservations
export const mockReservations: Reservation[] = Array.from({ length: 15 }, (_, i) => {
  const startDate = new Date(2024, 5 + Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1);
  const endDate = new Date(startDate.getTime() + (1 + Math.floor(Math.random() * 10)) * 24 * 60 * 60 * 1000);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
  const vehicle = mockVehicles[i % mockVehicles.length];
  const client = mockClients[i % mockClients.length];
  
  const dateStr = startDate.toISOString().slice(0, 10).replace(/-/g, '');
  
  return {
    id: `reservation_${i + 1}`,
    code: generateCode('REZ', i + 1, dateStr),
    clientId: client.id,
    vehicleId: vehicle.id,
    startDate: startDate.toISOString().slice(0, 10),
    endDate: endDate.toISOString().slice(0, 10),
    totalDays,
    dailyRate: vehicle.dailyRate,
    totalAmount: totalDays * vehicle.dailyRate,
    status: ['pending', 'confirmed', 'active', 'completed'][Math.floor(Math.random() * 4)] as any,
    createdAt: new Date(startDate.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
  };
});

// Generate payments for reservations
export const mockPayments: Payment[] = mockReservations.map((reservation, i) => ({
  id: `payment_${i + 1}`,
  code: `PLT-${reservation.code}`,
  reservationId: reservation.id,
  amount: reservation.totalAmount,
  method: ['card', 'cash', 'transfer'][Math.floor(Math.random() * 3)] as any,
  status: Math.random() > 0.1 ? 'completed' : 'pending' as any,
  createdAt: new Date(new Date(reservation.createdAt).getTime() + Math.random() * 24 * 60 * 60 * 1000).toISOString()
}));

// Generate feedback for some reservations
export const mockFeedback: Feedback[] = mockReservations.slice(0, 10).map((reservation, i) => {
  const client = mockClients.find(c => c.id === reservation.clientId)!;
  
  return {
    id: `feedback_${i + 1}`,
    code: `FBK-${client.code}`,
    reservationId: reservation.id,
    clientId: reservation.clientId,
    rating: 3 + Math.floor(Math.random() * 3),
    comment: [
      'Serviciu excelent, mașina în stare perfectă!',
      'Personal amabil, proceduri rapide.',
      'Mașina curată și bine întreținută.',
      'Experiență plăcută, recomand!',
      'Totul a decurs conform așteptărilor.',
      'Serviciu profesional, mulțumesc!',
      'Mașina a fost exact ce am căutat.',
      'Personal competent și helpful.',
      'Experiență fără probleme.',
      'Voi reveni cu siguranță!'
    ][i],
    createdAt: new Date(new Date(reservation.endDate).getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
  };
});

// Generate returns for completed reservations
export const mockReturns: VehicleReturn[] = mockReservations
  .filter(r => r.status === 'completed')
  .map((reservation, i) => ({
    id: `return_${i + 1}`,
    reservationId: reservation.id,
    returnDate: reservation.endDate,
    mileage: Math.floor(Math.random() * 500) + 50,
    fuelLevel: Math.floor(Math.random() * 100) + 1,
    condition: ['Foarte bună', 'Bună', 'Satisfăcătoare'][Math.floor(Math.random() * 3)],
    damages: Math.random() > 0.8 ? 'Zgârietură minoră pe portieră' : '',
    photos: [],
    reportCode: Math.random() > 0.8 ? generateCode('DAU', i + 1) : undefined,
    createdAt: new Date(new Date(reservation.endDate).getTime() + Math.random() * 24 * 60 * 60 * 1000).toISOString()
  }));
