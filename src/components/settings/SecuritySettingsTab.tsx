
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Shield, FileText } from 'lucide-react';

interface SecuritySettingsTabProps {
  onAuditLogOpen: () => void;
}

export const SecuritySettingsTab: React.FC<SecuritySettingsTabProps> = ({ onAuditLogOpen }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Setări Securitate
        </CardTitle>
        <CardDescription>
          Configurați politicile de securitate ale sistemului
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Politici Parole</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="min-password-length">Lungime Minimă Parolă</Label>
              <Input id="min-password-length" type="number" defaultValue="8" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-expiry">Expirare Parolă (zile)</Label>
              <Input id="password-expiry" type="number" defaultValue="90" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Setări Sesiune</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Timeout Sesiune (minute)</Label>
              <Input id="session-timeout" type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-login-attempts">Încercări Login Maximum</Label>
              <Input id="max-login-attempts" type="number" defaultValue="5" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Audit și Logging</h4>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="audit-logging">Audit Logging</Label>
              <p className="text-sm text-muted-foreground">Înregistrează toate acțiunile utilizatorilor</p>
            </div>
            <Switch id="audit-logging" defaultChecked />
          </div>
          
          <div className="flex gap-4 pt-4">
            <Button 
              variant="outline"
              onClick={onAuditLogOpen}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Vizualizare Jurnal Audit
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Salvează Setările</Button>
        </div>
      </CardContent>
    </Card>
  );
};
