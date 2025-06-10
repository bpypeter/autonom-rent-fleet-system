
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface VehicleConditionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservationCode: string;
  vehicleBrand: string;
  vehicleModel: string;
  licensePlate: string;
  clientName: string;
}

export const VehicleConditionFormModal: React.FC<VehicleConditionFormModalProps> = ({
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
        <title>Fișa Stare Vehicul la Returnare</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .info-section { margin: 20px 0; }
          .signature-section { margin-top: 50px; display: flex; justify-content: space-between; }
          .signature-box { border-top: 1px solid #000; width: 200px; text-align: center; padding-top: 5px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>FIȘA STARE VEHICUL LA RETURNARE</h1>
          <p>Cod Rezervare: ${reservationCode}</p>
        </div>
        
        <div class="info-section">
          <h3>Informații Vehicul</h3>
          <p><strong>Marca/Model:</strong> ${vehicleBrand} ${vehicleModel}</p>
          <p><strong>Numărul de înmatriculare:</strong> ${licensePlate}</p>
          <p><strong>Client:</strong> ${clientName}</p>
          <p><strong>Data returnării:</strong> ${new Date().toLocaleDateString('ro-RO')}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Element verificat</th>
              <th>Stare la preluare</th>
              <th>Stare la returnare</th>
              <th>Observații</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Caroserie exterioară</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Geamuri și oglinzi</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Cauciucuri și jante</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Interior vehicul</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Nivel combustibil</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Kilometraj</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Accesorii (GPS, telefon, etc.)</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div class="signature-section">
          <div>
            <div class="signature-box">Operator</div>
          </div>
          <div>
            <div class="signature-box">Client</div>
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Fisa_Stare_Vehicul_${reservationCode}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Fișa Stare Vehicul la Returnare</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Se va genera un document cu fișa de stare pentru vehiculul {vehicleBrand} {vehicleModel} ({licensePlate}).
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
