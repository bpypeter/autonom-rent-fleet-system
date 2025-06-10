
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface Invoice {
  id: string;
  number: string;
  clientName: string;
  amount: number;
  date: string;
  reservationCode: string;
}

interface InvoiceModalProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ 
  invoice, 
  isOpen, 
  onClose 
}) => {
  if (!invoice) return null;

  const handleDownloadPDF = () => {
    // Simulare descărcare PDF
    toast.success(`Factura ${invoice.number} a fost descărcată`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Factură {invoice.number}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-8 space-y-6">
              {/* Header Factură */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">FACTURĂ</h2>
                  <p className="text-muted-foreground">Nr. {invoice.number}</p>
                  <p className="text-muted-foreground">Data: {invoice.date}</p>
                </div>
                <div className="text-right">
                  <h3 className="font-bold">AUTONOM SERVICES SA</h3>
                  <p className="text-sm text-muted-foreground">Str. Fermelor 4, Cod 610145</p>
                  <p className="text-sm text-muted-foreground">Loc. Piatra Neamt, Judeţ Neamt</p>
                  <p className="text-sm text-muted-foreground">CUI: RO18433260</p>
                </div>
              </div>

              {/* Detalii Client */}
              <div>
                <h4 className="font-semibold mb-2">Facturat către:</h4>
                <p className="font-medium">{invoice.clientName}</p>
                <p className="text-sm text-muted-foreground">Pentru rezervarea: {invoice.reservationCode}</p>
              </div>

              {/* Detalii Servicii */}
              <div className="border rounded-lg">
                <div className="grid grid-cols-4 gap-4 p-4 bg-muted font-semibold">
                  <div>Descriere</div>
                  <div>Cantitate</div>
                  <div>Preț Unitar</div>
                  <div className="text-right">Total</div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-4 border-t">
                  <div>Închiriere vehicul</div>
                  <div>1</div>
                  <div>{invoice.amount} RON</div>
                  <div className="text-right font-semibold">{invoice.amount} RON</div>
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total de plată:</span>
                  <span className="text-2xl font-bold">{invoice.amount} RON</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handlePrint}>
              Print
            </Button>
            <Button onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              Descarcă PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
