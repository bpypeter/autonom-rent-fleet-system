import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Settings, Shield, Bell, Database, Mail, Globe } from 'lucide-react';
import { BackupManualModal } from '@/components/BackupManualModal';
import { RestoreBackupModal } from '@/components/RestoreBackupModal';
import { BackupHistoryModal } from '@/components/BackupHistoryModal';

export const SettingsPage: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  
  // Modal states
  const [backupModalOpen, setBackupModalOpen] = useState(false);
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

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
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
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
              </div>

              <div className="flex justify-end">
                <Button>Salvează Setările</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
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
                  {[
                    'Rezervare Nouă',
                    'Confirmare Rezervare',
                    'Anulare Rezervare',
                    'Returnare Vehicul',
                    'Plată Efectuată',
                    'Vehicul în Service'
                  ].map((type) => (
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
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
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
                    onClick={() => setBackupModalOpen(true)}
                  >
                    Backup Manual
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setRestoreModalOpen(true)}
                  >
                    Restaurare Backup
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setHistoryModalOpen(true)}
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
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
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
    </div>
  );
};
