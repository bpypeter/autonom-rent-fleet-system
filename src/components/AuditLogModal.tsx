
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, Filter, Download } from 'lucide-react';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  userType: 'operator' | 'client';
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
}

interface AuditLogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Date simulate pentru jurnalizare
const mockAuditLogs: AuditLogEntry[] = [
  {
    id: '1',
    timestamp: '2025-06-10 14:30:25',
    user: 'admin@autonom.ro',
    userType: 'operator',
    action: 'CREATE',
    resource: 'Rezervare',
    details: 'Rezervare nouă creată pentru vehiculul B-123-ABC',
    ipAddress: '192.168.1.100'
  },
  {
    id: '2',
    timestamp: '2025-06-10 13:15:42',
    user: 'ion.popescu@email.com',
    userType: 'client',
    action: 'UPDATE',
    resource: 'Profil',
    details: 'Actualizare număr telefon',
    ipAddress: '85.122.45.67'
  },
  {
    id: '3',
    timestamp: '2025-06-10 12:45:18',
    user: 'admin@autonom.ro',
    userType: 'operator',
    action: 'DELETE',
    resource: 'Vehicul',
    details: 'Vehicul B-456-DEF eliminat din flotă',
    ipAddress: '192.168.1.100'
  },
  {
    id: '4',
    timestamp: '2025-06-10 11:20:33',
    user: 'maria.ionescu@email.com',
    userType: 'client',
    action: 'CREATE',
    resource: 'Rezervare',
    details: 'Rezervare nouă pentru perioada 15-20 iunie',
    ipAddress: '78.96.112.45'
  },
  {
    id: '5',
    timestamp: '2025-06-10 10:05:12',
    user: 'admin@autonom.ro',
    userType: 'operator',
    action: 'UPDATE',
    resource: 'Setări',
    details: 'Modificare setări notificări email',
    ipAddress: '192.168.1.100'
  },
  {
    id: '6',
    timestamp: '2025-06-09 16:30:45',
    user: 'operator2@autonom.ro',
    userType: 'operator',
    action: 'CREATE',
    resource: 'Client',
    details: 'Client nou adăugat: George Vasilescu',
    ipAddress: '192.168.1.101'
  }
];

export const AuditLogModal: React.FC<AuditLogModalProps> = ({ open, onOpenChange }) => {
  const [logs, setLogs] = useState<AuditLogEntry[]>(mockAuditLogs);
  const [filteredLogs, setFilteredLogs] = useState<AuditLogEntry[]>(mockAuditLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    applyFilters(value, userTypeFilter, actionFilter);
  };

  const handleUserTypeFilter = (value: string) => {
    setUserTypeFilter(value);
    applyFilters(searchTerm, value, actionFilter);
  };

  const handleActionFilter = (value: string) => {
    setActionFilter(value);
    applyFilters(searchTerm, userTypeFilter, value);
  };

  const applyFilters = (search: string, userType: string, action: string) => {
    let filtered = logs;

    if (search) {
      filtered = filtered.filter(log => 
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.resource.toLowerCase().includes(search.toLowerCase()) ||
        log.details.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (userType !== 'all') {
      filtered = filtered.filter(log => log.userType === userType);
    }

    if (action !== 'all') {
      filtered = filtered.filter(log => log.action === action);
    }

    setFilteredLogs(filtered);
  };

  const exportAuditLog = () => {
    const csvContent = [
      'Timestamp,Utilizator,Tip Utilizator,Acțiune,Resursă,Detalii,Adresă IP',
      ...filteredLogs.map(log => 
        `"${log.timestamp}","${log.user}","${log.userType}","${log.action}","${log.resource}","${log.details}","${log.ipAddress}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `audit_log_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getActionBadgeVariant = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'default';
      case 'UPDATE':
        return 'secondary';
      case 'DELETE':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getUserTypeBadgeVariant = (userType: string) => {
    return userType === 'operator' ? 'default' : 'secondary';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Jurnal de Audit
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Filtre și căutare */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Căutare</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Căutare după utilizator, resursă sau detalii..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="w-full sm:w-48">
              <Label htmlFor="userType">Tip Utilizator</Label>
              <Select value={userTypeFilter} onValueChange={handleUserTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toți</SelectItem>
                  <SelectItem value="operator">Operator</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-48">
              <Label htmlFor="action">Acțiune</Label>
              <Select value={actionFilter} onValueChange={handleActionFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate</SelectItem>
                  <SelectItem value="CREATE">Creare</SelectItem>
                  <SelectItem value="UPDATE">Actualizare</SelectItem>
                  <SelectItem value="DELETE">Ștergere</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={exportAuditLog}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Tabel jurnal */}
          <div className="border rounded-lg overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background border-b">
                  <TableRow>
                    <TableHead className="w-32">Timestamp</TableHead>
                    <TableHead>Utilizator</TableHead>
                    <TableHead className="w-24">Tip</TableHead>
                    <TableHead className="w-24">Acțiune</TableHead>
                    <TableHead>Resursă</TableHead>
                    <TableHead>Detalii</TableHead>
                    <TableHead className="w-32">IP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">
                        {log.timestamp}
                      </TableCell>
                      <TableCell className="font-medium">
                        {log.user}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getUserTypeBadgeVariant(log.userType)}>
                          {log.userType === 'operator' ? 'Operator' : 'Client'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getActionBadgeVariant(log.action)}>
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell className="max-w-md truncate">
                        {log.details}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {log.ipAddress}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nu au fost găsite înregistrări care să corespundă criteriilor de căutare.
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            Total înregistrări: {filteredLogs.length} din {logs.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
