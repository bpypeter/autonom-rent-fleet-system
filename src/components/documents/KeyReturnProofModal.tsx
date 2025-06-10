
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface KeyReturnProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservationCode: string;
  vehicleBrand: string;
  vehicleModel: string;
  licensePlate: string;
  clientName: string;
}

export const KeyReturnProofModal: React.FC<KeyReturnProofModalProps> = ({
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
        <title>Dovadă Restituire Cheie/Documente</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .content { margin: 20px 0; }
          .signature-section { margin-top: 50px; display: flex; justify-content: space-between; }
          .signature-box { border-top: 1px solid #000; width: 200px; text-align: center; padding-top: 5px; }
          .checkbox-list { margin: 20px 0; }
          .checkbox-item { margin: 10px 0; display: flex; align-items: center; }
          .checkbox { margin-right: 10px; width: 15px; height: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>DOVADĂ DE RESTITUIRE CHEIE/DOCUMENTE</h1>
          <p>Cod Rezervare: ${reservationCode}</p>
        </div>
        
        <div class="content">
          <p><strong>Data:</strong> ${new Date().toLocaleDateString('ro-RO')}</p>
          <p><strong>Vehicul:</strong> ${vehicleBrand} ${vehicleModel}</p>
          <p><strong>Numărul de înmatriculare:</strong> ${licensePlate}</p>
          <p><strong>Client:</strong> ${clientName}</p>
        </div>

        <div class="checkbox-list">
          <h3>Elemente restituite:</h3>
          <div class="checkbox-item">
            <input type="checkbox" class="checkbox"> Cheie principală vehicul
          </div>
          <div class="checkbox-item">
            <input type="checkbox" class="checkbox"> Cheie de rezervă (dacă este cazul)
          </div>
          <div class="checkbox-item">
            <input type="checkbox" class="checkbox"> Carte de identitate vehicul
          </div>
          <div class="checkbox-item">
            <input type="checkbox" class="checkbox"> Asigurare RCA
          </div>
          <div class="checkbox-item">
            <input type="checkbox" class="checkbox"> Asigurare CASCO (dacă este cazul)
          </div>
          <div class="checkbox-item">
            <input type="checkbox" class="checkbox"> Manual utilizare vehicul
          </div>
          <div class="checkbox-item">
            <input type="checkbox" class="checkbox"> Kit reparații/roată de rezervă
          </div>
          <div class="checkbox-item">
            <input type="checkbox" class="checkbox"> Alte accesorii: ________________
          </div>
        </div>

        <div class="content">
          <p><strong>Observații:</strong></p>
          <div style="border: 1px solid #000; min-height: 80px; padding: 10px; margin: 10px 0;">
            
          </div>
        </div>

        <div class="signature-section">
          <div>
            <div class="signature-box">Operator</div>
            <p style="text-align: center; margin-top: 5px; font-size: 12px;">Nume și semnătură</p>
          </div>
          <div>
            <div class="signature-box">Client</div>
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
    a.download = `Dovada_Restituire_${reservationCode}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Dovadă Restituire Cheie/Documente</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Se va genera dovada de restituire pentru vehiculul {vehicleBrand} {vehicleModel} ({licensePlate}).
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
