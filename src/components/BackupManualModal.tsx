
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
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface BackupManualModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BackupManualModal: React.FC<BackupManualModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleBackup = async () => {
    setIsLoading(true);
    
    try {
      // Simulăm procesul de backup
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Backup Finalizat",
        description: "Backup-ul manual a fost creat cu succes.",
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Eroare",
        description: "A apărut o eroare în timpul backup-ului.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmare Backup Manual</DialogTitle>
          <DialogDescription>
            Sunteți sigur că doriți să faceți backup? Această operațiune poate dura câteva minute.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Anulează
          </Button>
          <Button
            onClick={handleBackup}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Se creează backup...' : 'Confirmă Backup'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
