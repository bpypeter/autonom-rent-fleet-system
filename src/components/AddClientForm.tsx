
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';

interface AddClientFormProps {
  onClientAdded: () => void;
}

export const AddClientForm: React.FC<AddClientFormProps> = ({ onClientAdded }) => {
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

    // Simulare salvare client
    console.log('Client nou:', formData);
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Adaugă Client Nou
        </CardTitle>
        <CardDescription>
          Introduceți datele clientului nou în sistem
        </CardDescription>
      </CardHeader>
      <CardContent>
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
              <Label htmlFor="nrCarteIdentitate">Nr. Carte Identitate</Label>
              <Input
                id="nrCarteIdentitate"
                value={formData.nrCarteIdentitate}
                onChange={(e) => handleInputChange('nrCarteIdentitate', e.target.value)}
                placeholder="AB123456"
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

          <Button type="submit" className="w-full">
            <UserPlus className="w-4 h-4 mr-2" />
            Adaugă Client
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
