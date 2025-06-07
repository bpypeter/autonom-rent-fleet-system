
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Phone, Mail, CreditCard, Calendar } from 'lucide-react';

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

interface ClientDetailsModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({ 
  client, 
  isOpen, 
  onClose 
}) => {
  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Detalii Client
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informații Personale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nume Complet</label>
                  <p className="text-lg font-medium">{client.numeComplet}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">CNP</label>
                  <p className="font-mono">{client.cnp || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nr. Carte Identitate</label>
                  <p className="font-mono">{client.nrCarteIdentitate || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Serie și Nr. Pașaport</label>
                  <p className="font-mono">{client.serieNrPasaport || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Categorie Permis</label>
                  <Badge variant="outline">{client.permisConducere}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data Înregistrare</label>
                  <p className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {client.dataInregistrare}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informații Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Telefon</label>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {client.telefon}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {client.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activitate Rezervări</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{client.rezervariActive}</div>
                  <p className="text-sm text-muted-foreground">Rezervări Active</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{client.totalRezervari}</div>
                  <p className="text-sm text-muted-foreground">Total Rezervări</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
