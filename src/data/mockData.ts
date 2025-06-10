import { Client, Vehicle, Reservation, Payment, Feedback, VehicleReturn } from '@/types';

// Generate code function
const generateCode = (prefix: string, counter: number, date?: string): string => {
  if (prefix === 'REZ' && date) {
    return `${prefix}${date}-${String(counter).padStart(3, '0')}`;
  }
  return `${prefix}-${String(counter).padStart(3, '0')}`;
};

// Generate 80 clients (40 existing + 40 new)
export const mockClients: Client[] = Array.from({ length: 80 }, (_, i) => {
  const names = [
    'Ion Popescu', 'Maria Ionescu', 'Alexandru Gheorghe', 'Elena Radu', 'Mihai Stoica',
    'Ana Dumitru', 'George Popa', 'Cristina Manea', 'Adrian Constantinescu', 'Raluca Diaconu',
    'Bogdan Marinescu', 'Ioana Stefanescu', 'Catalin Moldovan', 'Andreea Nicolaescu', 'Florin Tudor',
    'Carmen Vasilescu', 'Daniel Ene', 'Gabriela Barbu', 'Radu Munteanu', 'Monica Ungureanu',
    'Victor Neagu', 'Diana Tanase', 'Stefan Badea', 'Laura Preda', 'Marius Anghelescu',
    'Alina Cristea', 'Ciprian Lupu', 'Silvia Mocanu', 'Razvan Iancu', 'Oana Nistor',
    'Andrei Sandu', 'Corina Ciobanu', 'Lucian Stan', 'Bianca Zamfir', 'Vlad Enache',
    'Simona Paun', 'Gabriel Serban', 'Claudia Dinu', 'Robert Vlaicu', 'Roxana Apostol',
    'Cristian Ionescu', 'Mihaela Georgescu', 'Adrian Popescu', 'Livia Constantinescu', 'Bogdan Tudor',
    'Alexandra Dumitru', 'Nicolae Popa', 'Anca Manea', 'Sebastian Radu', 'Diana Stoica',
    'Marian Marinescu', 'Elena Stefanescu', 'Claudiu Moldovan', 'Irina Nicolaescu', 'Rares Tudor',
    'Simona Vasilescu', 'Dragos Ene', 'Monica Barbu', 'Catalin Munteanu', 'Andreea Ungureanu',
    'Pavel Neagu', 'Laura Tanase', 'Cristian Badea', 'Ana Preda', 'Florin Anghelescu',
    'Maria Cristea', 'Razvan Lupu', 'Elena Mocanu', 'Adrian Iancu', 'Irina Nistor',
    'Gabriel Sandu', 'Anca Ciobanu', 'Mihai Stan', 'Roxana Zamfir', 'Vlad Enache',
    'Carmen Paun', 'Daniel Serban', 'Livia Dinu', 'Sebastian Vlaicu', 'Diana Apostol'
  ];
  
  const name = names[i] || `Client ${i + 1}`;
  const email = `${name.toLowerCase().replace(/\s+/g, '.')}.${i}@email.com`;
  
  return {
    id: `client_${i + 1}`,
    code: generateCode('CLI', i + 1),
    name,
    email,
    phone: `072${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`,
    address: `Strada ${['Victoriei', 'Unirii', 'Libertății', 'Mihai Viteazu', 'Stefan cel Mare', 'Calea Dorobanti', 'Bulevardul Magheru', 'Strada Amzei', 'Calea Victoriei', 'Bulevardul Aviatorilor'][i % 10]} nr. ${i + 1}, București`,
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
    licensePlate: `B${String(Math.floor(Math.random() * 100)).padStart(2, '0')}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
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

// Generate 49 reservations (20 for August-September + 7 for June + 7 for July + 15 others)
export const mockReservations: Reservation[] = Array.from({ length: 49 }, (_, i) => {
  let startDate, endDate;
  
  // First 20 reservations for August-September 2024
  if (i < 20) {
    const month = Math.random() > 0.5 ? 7 : 8; // August (7) or September (8)
    startDate = new Date(2024, month, Math.floor(Math.random() * 20) + 1);
    endDate = new Date(startDate.getTime() + (3 + Math.floor(Math.random() * 7)) * 24 * 60 * 60 * 1000);
  }
  // Next 7 reservations for June 2024
  else if (i < 27) {
    startDate = new Date(2024, 5, Math.floor(Math.random() * 28) + 1); // June (5)
    endDate = new Date(startDate.getTime() + (2 + Math.floor(Math.random() * 8)) * 24 * 60 * 60 * 1000);
  }
  // Next 7 reservations for July 2024
  else if (i < 34) {
    startDate = new Date(2024, 6, Math.floor(Math.random() * 28) + 1); // July (6)
    endDate = new Date(startDate.getTime() + (2 + Math.floor(Math.random() * 8)) * 24 * 60 * 60 * 1000);
  }
  // Remaining 15 reservations for other months
  else {
    startDate = new Date(2024, 5 + Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1);
    endDate = new Date(startDate.getTime() + (1 + Math.floor(Math.random() * 10)) * 24 * 60 * 60 * 1000);
  }
  
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
export const mockFeedback: Feedback[] = mockReservations.slice(0, 15).map((reservation, i) => {
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
      'Voi reveni cu siguranță!',
      'Foarte mulțumit de servicii.',
      'Recomand cu încredere.',
      'Experiență de neuitat!',
      'Servicii de calitate superioară.',
      'Îmi place să lucrez cu voi!'
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
