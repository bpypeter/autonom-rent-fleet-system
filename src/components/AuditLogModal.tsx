import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar } from 'lucide-react';
import { AuditLogFilters } from '@/components/audit/AuditLogFilters';
import { AuditLogTable } from '@/components/audit/AuditLogTable';

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
          <AuditLogFilters
            searchTerm={searchTerm}
            userTypeFilter={userTypeFilter}
            actionFilter={actionFilter}
            onSearchChange={handleSearch}
            onUserTypeChange={handleUserTypeFilter}
            onActionChange={handleActionFilter}
            onExport={exportAuditLog}
          />

          <AuditLogTable logs={filteredLogs} />

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

export default AuditLogModal;
