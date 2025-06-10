
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Globe } from 'lucide-react';

export const IntegrationsSettingsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Integrări Externe
        </CardTitle>
        <CardDescription>
          Configurați integrările cu servicii externe
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Servicii Email</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="smtp-server">Server SMTP</Label>
              <Input id="smtp-server" placeholder="smtp.gmail.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port">Port SMTP</Label>
              <Input id="smtp-port" type="number" placeholder="587" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-user">Utilizator SMTP</Label>
              <Input id="smtp-user" type="email" placeholder="your-email@gmail.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-password">Parolă SMTP</Label>
              <Input id="smtp-password" type="password" placeholder="••••••••" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Gateway Plăți</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="payment-provider">Furnizor Plăți</Label>
              <Select defaultValue="stripe">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="netopia">Netopia Payments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input id="api-key" type="password" placeholder="sk_test_..." />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Servicii SMS</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="sms-provider">Furnizor SMS</Label>
              <Select defaultValue="twilio">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twilio">Twilio</SelectItem>
                  <SelectItem value="clicksend">ClickSend</SelectItem>
                  <SelectItem value="smsro">SMS.ro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sms-api-key">API Key SMS</Label>
              <Input id="sms-api-key" type="password" placeholder="••••••••" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Salvează Integrările</Button>
        </div>
      </CardContent>
    </Card>
  );
};
