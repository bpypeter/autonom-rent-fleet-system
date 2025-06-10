
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const predefinedUsers: User[] = [
  {
    id: '1',
    username: 'client',
    password: 'client',
    role: 'client',
    email: 'client@autonom.ro',
    name: 'Ion Popescu',
    phone: '0721234567'
  },
  {
    id: '2',
    username: 'operator',
    password: 'operator',
    role: 'operator',
    email: 'operator@autonom.ro',
    name: 'Maria Ionescu',
    phone: '0721234568'
  },
  {
    id: '3',
    username: 'admin',
    password: 'admin',
    role: 'admin',
    email: 'admin@autonom.ro',
    name: 'Alexandru Gheorghe',
    phone: '0721234569'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('autonom_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const foundUser = predefinedUsers.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('autonom_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('autonom_user');
    // Force page reload to ensure complete state reset
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
