
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockClients, mockVehicles } from '@/data/mockData';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, FileTextIcon, BuildingIcon, CarIcon, CreditCardIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProformaInvoiceModalProps {
  reservation: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProformaInvoiceModal: React.FC<ProformaInvoiceModalProps> = ({
  reservation,
  isOpen,
  onClose
}) => {
  if (!reservation) return null;

  const client = mockClients.find(c => c.id === reservation.clientId);
  const vehicle = mockVehicles.find(v => v.id === reservation.vehicleId);
  
  const invoiceNumber = `PROF-${reservation.code.replace('REZ', '')}`;
  const currentDate = new Date().toLocaleDateString('ro-RO');
  const dueDate = new Date(new Date().setDate(new Date().getDate() + 5)).toLocaleDateString('ro-RO');

  const vatRate = 19; // 19% TVA în România
  const vatAmount = (reservation.totalAmount * vatRate) / 100;
  const totalWithVat = reservation.totalAmount + vatAmount;
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="flex items-center gap-2">
            <FileTextIcon className="w-5 h-5" />
            Factură Proforma
          </DialogTitle>
          <DialogDescription>
            Factura proforma pentru rezervarea {reservation.code}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 print:text-black">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">AUTONOM SERVICES SA</h3>
              <p className="text-sm">CUI: RO18433260</p>
              <p className="text-sm">Reg. Com.: J2006000280271</p>
              <p className="text-sm">Adresa: Str. Fermelor 4, Cod 610145</p>
              <p className="text-sm">Loc. Piatra Neamt, Judeţ Neamt</p>
              <p className="text-sm">Email: contact@autonomservices.ro</p>
            </div>
            <div className="text-right">
              <h2 className="font-bold text-xl">FACTURĂ PROFORMA</h2>
              <p className="text-sm">Seria: PROF</p>
              <p className="text-sm">Număr: {invoiceNumber}</p>
              <p className="text-sm">Data emiterii: {currentDate}</p>
              <p className="text-sm">Data scadentă: {dueDate}</p>
            </div>
          </div>

          <Separator />

          {/* Client & Provider Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BuildingIcon className="w-4 h-4" />
                <h3 className="font-medium">FURNIZOR</h3>
              </div>
              <p className="text-sm font-medium">AUTONOM SERVICES SA</p>
              <p className="text-sm">CUI: RO18433260</p>
              <p className="text-sm">Reg. Com.: J2006000280271</p>
              <p className="text-sm">Adresa: Str. Fermelor 4, Cod 610145</p>
              <p className="text-sm">Loc. Piatra Neamt, Judeţ Neamt</p>
              <p className="text-sm">Cont: RO12INGB0000999123456789</p>
              <p className="text-sm">Banca: ING Bank</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BuildingIcon className="w-4 h-4" />
                <h3 className="font-medium">CLIENT</h3>
              </div>
              <p className="text-sm font-medium">{client?.name}</p>
              <p className="text-sm">Telefon: {client?.phone}</p>
              <p className="text-sm">Email: {client?.email}</p>
              <p className="text-sm">Adresa: {client?.address || 'Nedisponibilă'}</p>
              <p className="text-sm">Permis conducere: {client?.licenseNumber}</p>
            </div>
          </div>

          {/* Vehicle Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CarIcon className="w-4 h-4" />
              <h3 className="font-medium">INFORMAȚII VEHICUL</h3>
            </div>
            <p className="text-sm">Vehicul: {vehicle?.brand} {vehicle?.model}</p>
            <p className="text-sm">Număr înmatriculare: {vehicle?.licensePlate}</p>
            <p className="text-sm">An fabricație: {vehicle?.year}</p>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-3 h-3" />
                <span className="text-sm">De la: {reservation.startDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-3 h-3" />
                <span className="text-sm">Până la: {reservation.endDate}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Total zile: {reservation.totalDays}</span>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div>
            <h3 className="font-medium mb-2">DETALII FACTURĂ</h3>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Nr.</TableHead>
                    <TableHead className="text-xs">Descriere serviciu</TableHead>
                    <TableHead className="text-xs text-right">Preț unitar</TableHead>
                    <TableHead className="text-xs text-right">Cantitate</TableHead>
                    <TableHead className="text-xs text-right">Valoare</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-xs">1</TableCell>
                    <TableCell className="text-xs">Închiriere {vehicle?.brand} {vehicle?.model}</TableCell>
                    <TableCell className="text-xs text-right">{vehicle?.dailyRate} RON</TableCell>
                    <TableCell className="text-xs text-right">{reservation.totalDays} zile</TableCell>
                    <TableCell className="text-xs text-right">{reservation.totalAmount} RON</TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4} className="text-right text-xs font-medium">Subtotal:</TableCell>
                    <TableCell className="text-right text-xs">{reservation.totalAmount} RON</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4} className="text-right text-xs font-medium">TVA ({vatRate}%):</TableCell>
                    <TableCell className="text-right text-xs">{vatAmount.toFixed(2)} RON</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4} className="text-right text-xs font-medium">Total:</TableCell>
                    <TableCell className="text-right text-xs font-semibold">{totalWithVat.toFixed(2)} RON</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CreditCardIcon className="w-4 h-4" />
              <h3 className="font-medium">INFORMAȚII PLATĂ</h3>
            </div>
            <p className="text-sm">Metodă de plată: Transfer bancar</p>
            <p className="text-sm">Beneficiar: AUTONOM SERVICES SA</p>
            <p className="text-sm">Cont: RO12INGB0000999123456789</p>
            <p className="text-sm">Banca: ING Bank</p>
            <p className="text-sm font-medium mt-1">Vă rugăm să menționați numărul facturii proforma ({invoiceNumber}) la efectuarea plății.</p>
          </div>

          {/* Footer Notes */}
          <div className="text-xs text-muted-foreground">
            <p>Aceasta este o factură proformă și nu constituie document fiscal conform legislației în vigoare.</p>
            <p>Factura fiscală va fi emisă la momentul încasării.</p>
          </div>

          {/* Print Button - hidden when printing */}
          <div className="text-right print:hidden">
            <Button onClick={handlePrint} size="sm">
              <FileTextIcon className="w-4 h-4 mr-2" />
              Printează Factura
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
