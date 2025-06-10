
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Database, Download } from 'lucide-react';

interface BackupHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Date mockup pentru istoric backup-uri
const backupHistory = [
  {
    id: '1',
    date: '2025-06-10',
    time: '02:00:15',
    type: 'Automat',
    size: '2.3 MB',
    status: 'Finalizat',
  },
  {
    id: '2',
    date: '2025-06-09',
    time: '14:32:08',
    type: 'Manual',
    size: '2.1 MB',
    status: 'Finalizat',
  },
  {
    id: '3',
    date: '2025-06-09',
    time: '02:00:12',
    type: 'Automat',
    size: '2.0 MB',
    status: 'Finalizat',
  },
  {
    id: '4',
    date: '2025-06-08',
    time: '02:00:45',
    type: 'Automat',
    size: '1.9 MB',
    status: 'Eșuat',
  },
  {
    id: '5',
    date: '2025-06-07',
    time: '02:00:23',
    type: 'Automat',
    size: '1.8 MB',
    status: 'Finalizat',
  },
];

export const BackupHistoryModal: React.FC<BackupHistoryModalProps> = ({
  open,
  onOpenChange,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Finalizat':
        return <Badge variant="default" className="bg-green-500">Finalizat</Badge>;
      case 'Eșuat':
        return <Badge variant="destructive">Eșuat</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    return type === 'Manual' 
      ? <Badge variant="outline">Manual</Badge>
      : <Badge variant="secondary">Automat</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Istoric Backup-uri
          </DialogTitle>
          <DialogDescription>
            Vizualizați istoricul backup-urilor create și descărcați-le dacă este necesar.
          </DialogDescription>
        </DialogHeader>
        
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Data
                </TableHead>
                <TableHead className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Ora
                </TableHead>
                <TableHead>Tip</TableHead>
                <TableHead>Dimensiune</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backupHistory.map((backup) => (
                <TableRow key={backup.id}>
                  <TableCell className="font-medium">{backup.date}</TableCell>
                  <TableCell>{backup.time}</TableCell>
                  <TableCell>{getTypeBadge(backup.type)}</TableCell>
                  <TableCell>{backup.size}</TableCell>
                  <TableCell>{getStatusBadge(backup.status)}</TableCell>
                  <TableCell>
                    {backup.status === 'Finalizat' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Download className="h-3 w-3" />
                        Descarcă
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
