
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserCheck } from 'lucide-react';
import { useClients } from '@/contexts/ClientContext';
import { toast } from 'sonner';

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

interface EditClientFormProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onClientUpdated: () => void;
}

export const EditClientForm: React.FC<EditClientFormProps> = ({ 
  client, 
  isOpen, 
  onClose, 
  onClientUpdated 
}) => {
  const { updateClient } = useClients();
  const [formData, setFormData] = useState({
    numeComplet: '',
    cnp: '',
    nrCarteIdentitate: '',
    serieNrPasaport: '',
    permisConducere: '',
    telefon: '',
    email: ''
  });

  React.useEffect(() => {
    if (client) {
      setFormData({
        numeComplet: client.numeComplet,
        cnp: client.cnp,
        nrCarteIdentitate: client.nrCarteIdentitate,
        serieNrPasaport: client.serieNrPasaport,
        permisConducere: client.permisConducere,
        telefon: client.telefon,
        email: client.email
      });
    }
  }, [client]);

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
    
    if (!client) return;
    
    // Validare de bază
    if (!formData.numeComplet || !formData.telefon || !formData.email || !formData.permisConducere) {
      toast.error('Vă rugăm să completați toate câmpurile obligatorii');
      return;
    }

    updateClient(client.id, formData);
    console.log('Client actualizat:', { id: client.id, ...formData });
    toast.success('Datele clientului au fost actualizate cu succes!');
    
    onClientUpdated();
    onClose();
  };

  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Editare Client - {client.numeComplet}
          </DialogTitle>
        </DialogHeader>
        
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

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              <UserCheck className="w-4 h-4 mr-2" />
              Salvează Modificările
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Anulează
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
