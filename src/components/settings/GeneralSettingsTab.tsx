
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Settings } from 'lucide-react';

export const GeneralSettingsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Setări Generale
        </CardTitle>
        <CardDescription>
          Configurația de bază a sistemului
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="company-name">Numele Companiei</Label>
            <Input id="company-name" defaultValue="AUTONOM" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email Contact</Label>
            <Input id="contact-email" defaultValue="contact@autonom.ro" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-phone">Telefon Contact</Label>
            <Input id="contact-phone" defaultValue="+40 721 234 567" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Moneda</Label>
            <Select defaultValue="ron">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ron">RON - Leu Românesc</SelectItem>
                <SelectItem value="eur">EUR - Euro</SelectItem>
                <SelectItem value="usd">USD - Dolar American</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="font-medium">Setări Rezervări</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="min-rental-days">Minimum Zile Închiriere</Label>
              <Input id="min-rental-days" type="number" defaultValue="1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-rental-days">Maximum Zile Închiriere</Label>
              <Input id="max-rental-days" type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="advance-booking">Rezervare în Avans (zile)</Label>
              <Input id="advance-booking" type="number" defaultValue="90" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cancellation-hours">Anulare Gratuită (ore)</Label>
              <Input id="cancellation-hours" type="number" defaultValue="24" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Salvează Modificările</Button>
        </div>
      </CardContent>
    </Card>
  );
};
