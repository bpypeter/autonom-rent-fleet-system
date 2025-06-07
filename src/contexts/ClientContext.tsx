
import React, { createContext, useContext, useState, ReactNode } from 'react';

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

export const ClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      numeComplet: 'Ion Popescu',
      cnp: '1234567890123',
      nrCarteIdentitate: 'AB123456',
      serieNrPasaport: '',
      permisConducere: 'B',
      telefon: '0712345678',
      email: 'ion.popescu@email.com',
      dataInregistrare: '2024-01-15',
      rezervariActive: 0,
      totalRezervari: 0
    },
    {
      id: '2',
      numeComplet: 'Maria Ionescu',
      cnp: '2345678901234',
      nrCarteIdentitate: 'CD789012',
      serieNrPasaport: '',
      permisConducere: 'B',
      telefon: '0787654321',
      email: 'maria.ionescu@email.com',
      dataInregistrare: '2024-02-20',
      rezervariActive: 0,
      totalRezervari: 0
    }
  ]);

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
