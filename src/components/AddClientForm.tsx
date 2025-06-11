
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus } from 'lucide-react';
import { useClients } from '@/contexts/ClientContext';
import { toast } from 'sonner';

interface AddClientFormProps {
  onClientAdded: () => void;
  onClose: () => void;
}

export const AddClientForm: React.FC<AddClientFormProps> = ({ onClientAdded, onClose }) => {
  const { addClient } = useClients();
  const [formData, setFormData] = useState({
    numeComplet: '',
    cnp: '',
    nrCarteIdentitate: '',
    serieNrPasaport: '',
    permisConducere: '',
    telefon: '',
    email: ''
  });

  const handleInputChange = (field: string, value: string) => {
    // Validare pentru cartea de identitate - maxim 8 caractere
    if (field === 'nrCarteIdentitate' && value.length > 8) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validare de bază
    if (!formData.numeComplet || !formData.telefon || !formData.email || !formData.permisConducere) {
      toast.error('Vă rugăm să completați toate câmpurile obligatorii');
      return;
    }

    const newClient = {
      id: `client_${Date.now()}`,
      ...formData,
      dataInregistrare: new Date().toISOString().split('T')[0],
      rezervariActive: 0,
      totalRezervari: 0
    };

    addClient(newClient);
    console.log('Client nou:', newClient);
    toast.success('Clientul a fost adăugat cu succes!');
    
    // Reset form
    setFormData({
      numeComplet: '',
      cnp: '',
      nrCarteIdentitate: '',
      serieNrPasaport: '',
      permisConducere: '',
      telefon: '',
      email: ''
    });
    
    onClientAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="numeComplet">Nume Complet *</Label>
          <Input
            id="numeComplet"
            value={formData.numeComplet}
            onChange={(e) => handleInputChange('numeComplet', e.target.value)}
            placeholder="Ex: Ion Popescu"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cnp">CNP</Label>
          <Input
            id="cnp"
            value={formData.cnp}
            onChange={(e) => handleInputChange('cnp', e.target.value)}
            placeholder="1234567890123"
            maxLength={13}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nrCarteIdentitate">Nr. Carte Identitate (max 8 caractere)</Label>
          <Input
            id="nrCarteIdentitate"
            value={formData.nrCarteIdentitate}
            onChange={(e) => handleInputChange('nrCarteIdentitate', e.target.value)}
            placeholder="AB123456"
            maxLength={8}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="serieNrPasaport">Serie și Nr. Pașaport</Label>
          <Input
            id="serieNrPasaport"
            value={formData.serieNrPasaport}
            onChange={(e) => handleInputChange('serieNrPasaport', e.target.value)}
            placeholder="12345678"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="permisConducere">Categorie Permis Conducere *</Label>
          <Input
            id="permisConducere"
            value={formData.permisConducere}
            onChange={(e) => handleInputChange('permisConducere', e.target.value)}
            placeholder="B"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="telefon">Telefon *</Label>
          <Input
            id="telefon"
            type="tel"
            value={formData.telefon}
            onChange={(e) => handleInputChange('telefon', e.target.value)}
            placeholder="0712345678"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="ion.popescu@email.com"
          required
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          <UserPlus className="w-4 h-4 mr-2" />
          Adaugă Client
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Anulează
        </Button>
      </div>
    </form>
  );
};
