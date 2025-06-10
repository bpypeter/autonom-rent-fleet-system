
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BackupManualModal } from '@/components/BackupManualModal';
import { RestoreBackupModal } from '@/components/RestoreBackupModal';
import { BackupHistoryModal } from '@/components/BackupHistoryModal';
import { AuditLogModal } from '@/components/AuditLogModal';
import { GeneralSettingsTab } from '@/components/settings/GeneralSettingsTab';
import { SecuritySettingsTab } from '@/components/settings/SecuritySettingsTab';
import { NotificationsSettingsTab } from '@/components/settings/NotificationsSettingsTab';
import { BackupSettingsTab } from '@/components/settings/BackupSettingsTab';
import { IntegrationsSettingsTab } from '@/components/settings/IntegrationsSettingsTab';

export const SettingsPage: React.FC = () => {
  // Modal states
  const [backupModalOpen, setBackupModalOpen] = useState(false);
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [auditLogModalOpen, setAuditLogModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Setări Sistem</h1>
        <p className="text-muted-foreground">
          Configurați setările generale ale sistemului AUTONOM
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Securitate</TabsTrigger>
          <TabsTrigger value="notifications">Notificări</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="integrations">Integrări</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <GeneralSettingsTab />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecuritySettingsTab onAuditLogOpen={() => setAuditLogModalOpen(true)} />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationsSettingsTab />
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <BackupSettingsTab
            onBackupModalOpen={() => setBackupModalOpen(true)}
            onRestoreModalOpen={() => setRestoreModalOpen(true)}
            onHistoryModalOpen={() => setHistoryModalOpen(true)}
          />
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <IntegrationsSettingsTab />
        </TabsContent>
      </Tabs>

      {/* Backup Modals */}
      <BackupManualModal 
        open={backupModalOpen} 
        onOpenChange={setBackupModalOpen} 
      />
      <RestoreBackupModal 
        open={restoreModalOpen} 
        onOpenChange={setRestoreModalOpen} 
      />
      <BackupHistoryModal 
        open={historyModalOpen} 
        onOpenChange={setHistoryModalOpen} 
      />
      
      {/* Audit Log Modal */}
      <AuditLogModal 
        open={auditLogModalOpen} 
        onOpenChange={setAuditLogModalOpen} 
      />
    </div>
  );
};
