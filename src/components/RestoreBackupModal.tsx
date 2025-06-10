
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertTriangle } from 'lucide-react';

interface RestoreBackupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RestoreBackupModal: React.FC<RestoreBackupModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRestore = async () => {
    if (!password.trim()) {
      toast({
        title: "Eroare",
        description: "Vă rugăm să introduceți parola pentru restaurare.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulăm verificarea parolei și procesul de restaurare
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulăm verificarea parolei (în realitate ar trebui validată pe server)
      if (password !== 'admin123') {
        toast({
          title: "Eroare",
          description: "Parola introdusă este incorectă.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Restaurare Finalizată",
        description: "Backup-ul a fost restaurat cu succes.",
      });
      
      setPassword('');
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Eroare",
        description: "A apărut o eroare în timpul restaurării.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPassword('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Confirmare Restaurare Backup
          </DialogTitle>
          <DialogDescription>
            Sunteți sigur că doriți să restaurați backup? Această operațiune va înlocui toate datele actuale și nu poate fi anulată.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="restore-password">Parolă de restaurare</Label>
            <Input
              id="restore-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduceți parola de restaurare"
              disabled={isLoading}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Anulează
          </Button>
          <Button
            variant="destructive"
            onClick={handleRestore}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Se restaurează...' : 'Confirmă Restaurare'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
