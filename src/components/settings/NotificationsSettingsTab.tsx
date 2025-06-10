
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Bell } from 'lucide-react';

export const NotificationsSettingsTab: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const notificationTypes = [
    'Rezervare Nouă',
    'Confirmare Rezervare',
    'Anulare Rezervare',
    'Returnare Vehicul',
    'Plată Efectuată',
    'Vehicul în Service'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Setări Notificări
        </CardTitle>
        <CardDescription>
          Configurați tipurile de notificări și canalele de comunicare
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Canale de Notificare</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Notificări Email</Label>
                <p className="text-sm text-muted-foreground">Trimite notificări prin email</p>
              </div>
              <Switch 
                id="email-notifications" 
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications">Notificări SMS</Label>
                <p className="text-sm text-muted-foreground">Trimite notificări prin SMS</p>
              </div>
              <Switch 
                id="sms-notifications" 
                checked={smsNotifications}
                onCheckedChange={setSmsNotifications}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Tipuri de Notificări</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notificationTypes.map((type) => (
              <div key={type} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">{type}</span>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Salvează Preferințele</Button>
        </div>
      </CardContent>
    </Card>
  );
};
