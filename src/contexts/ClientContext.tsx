
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockClients } from '@/data/mockData';

interface Client {
  id: string;
  numeComplet: string;
  cnp: string;
  nrCarteIdentitate: string;
  serieNrPasaport: string;
  permisConducere: string;
  telefon: string;
  email: string;
  dataInregistrare: string;
  rezervariActive: number;
  totalRezervari: number;
}

interface ClientContextType {
  clients: Client[];
  addClient: (client: Client) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  getClientById: (id: string) => Client | undefined;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const useClients = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClients must be used within a ClientProvider');
  }
  return context;
};

// Convert mockClients to the Client interface format
const convertedMockClients: Client[] = mockClients.map(client => ({
  id: client.id,
  numeComplet: client.name,
  cnp: client.licenseNumber, // Using licenseNumber as CNP temporarily
  nrCarteIdentitate: client.code,
  serieNrPasaport: '',
  permisConducere: client.licenseNumber,
  telefon: client.phone,
  email: client.email,
  dataInregistrare: new Date(client.createdAt).toISOString().split('T')[0],
  rezervariActive: 0,
  totalRezervari: 0
}));

export const ClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>(convertedMockClients);

  const addClient = (client: Client) => {
    setClients(prev => [...prev, client]);
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(prev => prev.map(client => 
      client.id === id ? { ...client, ...updates } : client
    ));
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
  };

  const getClientById = (id: string) => {
    return clients.find(client => client.id === id);
  };

  return (
    <ClientContext.Provider value={{
      clients,
      addClient,
      updateClient,
      deleteClient,
      getClientById
    }}>
      {children}
    </ClientContext.Provider>
  );
};
