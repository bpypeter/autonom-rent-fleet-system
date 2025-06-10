
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Database } from 'lucide-react';

interface BackupSettingsTabProps {
  onBackupModalOpen: () => void;
  onRestoreModalOpen: () => void;
  onHistoryModalOpen: () => void;
}

export const BackupSettingsTab: React.FC<BackupSettingsTabProps> = ({
  onBackupModalOpen,
  onRestoreModalOpen,
  onHistoryModalOpen
}) => {
  const [autoBackup, setAutoBackup] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Setări Backup
        </CardTitle>
        <CardDescription>
          Configurați backup-ul automat al datelor
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="auto-backup">Backup Automat</Label>
            <p className="text-sm text-muted-foreground">Efectuează backup automat al bazei de date</p>
          </div>
          <Switch 
            id="auto-backup" 
            checked={autoBackup}
            onCheckedChange={setAutoBackup}
          />
        </div>

        {autoBackup && (
          <>
            <Separator />
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Frecvența Backup</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Orar</SelectItem>
                      <SelectItem value="daily">Zilnic</SelectItem>
                      <SelectItem value="weekly">Săptămânal</SelectItem>
                      <SelectItem value="monthly">Lunar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-time">Ora Backup</Label>
                  <Input id="backup-time" type="time" defaultValue="02:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retention-days">Păstrare Backup (zile)</Label>
                  <Input id="retention-days" type="number" defaultValue="30" />
                </div>
              </div>
            </div>
          </>
        )}

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Acțiuni Backup</h4>
          <div className="flex gap-4">
            <Button 
              variant="outline"
              onClick={onBackupModalOpen}
            >
              Backup Manual
            </Button>
            <Button 
              variant="outline"
              onClick={onRestoreModalOpen}
            >
              Restaurare Backup
            </Button>
            <Button 
              variant="outline"
              onClick={onHistoryModalOpen}
            >
              Vizualizare Istoric
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Salvează Configurația</Button>
        </div>
      </CardContent>
    </Card>
  );
};
