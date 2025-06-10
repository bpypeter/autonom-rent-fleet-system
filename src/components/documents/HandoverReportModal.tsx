
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface HandoverReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservationCode: string;
  vehicleBrand: string;
  vehicleModel: string;
  licensePlate: string;
  clientName: string;
}

export const HandoverReportModal: React.FC<HandoverReportModalProps> = ({
  isOpen,
  onClose,
  reservationCode,
  vehicleBrand,
  vehicleModel,
  licensePlate,
  clientName
}) => {
  const generateDocument = () => {
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Proces-verbal Predare-Primire Vehicul</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .section { margin: 20px 0; }
          .signature-section { margin-top: 50px; display: flex; justify-content: space-between; }
          .signature-box { border-top: 1px solid #000; width: 200px; text-align: center; padding-top: 5px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .info-box { border: 1px solid #000; padding: 10px; margin: 10px 0; min-height: 60px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>PROCES-VERBAL DE PREDARE-PRIMIRE VEHICUL</h1>
          <p>Cod Rezervare: ${reservationCode}</p>
        </div>
        
        <div class="section">
          <h3>1. Identificarea părților</h3>
          <p><strong>Locatorul:</strong> [Numele companiei de închiriere]</p>
          <p><strong>Locatarul:</strong> ${clientName}</p>
          <p><strong>Data și ora predării:</strong> ${new Date().toLocaleString('ro-RO')}</p>
        </div>

        <div class="section">
          <h3>2. Identificarea vehiculului</h3>
          <p><strong>Marca și modelul:</strong> ${vehicleBrand} ${vehicleModel}</p>
          <p><strong>Numărul de înmatriculare:</strong> ${licensePlate}</p>
          <p><strong>Anul fabricației:</strong> ________________</p>
          <p><strong>Numărul de șasiu:</strong> ________________</p>
        </div>

        <div class="section">
          <h3>3. Starea vehiculului la predare</h3>
          <table>
            <thead>
              <tr>
                <th>Element verificat</th>
                <th>Stare</th>
                <th>Observații</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kilometraj</td>
                <td>_______ km</td>
                <td></td>
              </tr>
              <tr>
                <td>Nivel combustibil</td>
                <td>_______ %</td>
                <td></td>
              </tr>
              <tr>
                <td>Starea caroseriei</td>
                <td>Bună / Satisfăcătoare / Deficitară</td>
                <td></td>
              </tr>
              <tr>
                <td>Starea interiorului</td>
                <td>Bună / Satisfăcătoare / Deficitară</td>
                <td></td>
              </tr>
              <tr>
                <td>Funcționarea sistemelor</td>
                <td>Bună / Satisfăcătoare / Deficitară</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="section">
          <h3>4. Constatări și observații</h3>
          <div class="info-box">
            <p>Defecțiuni/deteriorări constatate:</p>
          </div>
          <div class="info-box">
            <p>Observații suplimentare:</p>
          </div>
        </div>

        <div class="section">
          <h3>5. Declarație de acceptare</h3>
          <p>Prin semnarea acestui proces-verbal, părțile confirmă că:</p>
          <ul>
            <li>Vehiculul a fost predat/primit în starea descrisă mai sus</li>
            <li>Toate informațiile din document sunt corecte</li>
            <li>S-au predat/primit toate cheile și documentele necesare</li>
          </ul>
        </div>

        <div class="signature-section">
          <div>
            <div class="signature-box">Reprezentant Locator</div>
            <p style="text-align: center; margin-top: 5px; font-size: 12px;">Nume, funcție și semnătură</p>
          </div>
          <div>
            <div class="signature-box">Locatar</div>
            <p style="text-align: center; margin-top: 5px; font-size: 12px;">Nume și semnătură</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Proces_Verbal_${reservationCode}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Proces-verbal Predare-Primire Vehicul</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Se va genera procesul-verbal de predare-primire pentru vehiculul {vehicleBrand} {vehicleModel} ({licensePlate}).
          </p>
          <Button onClick={generateDocument} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Descarcă Document
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
