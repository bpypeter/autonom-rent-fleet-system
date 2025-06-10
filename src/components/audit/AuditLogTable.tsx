
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

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

interface AuditLogTableProps {
  logs: AuditLogEntry[];
}

export const AuditLogTable: React.FC<AuditLogTableProps> = ({ logs }) => {
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
            {logs.map((log) => (
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
  );
};
