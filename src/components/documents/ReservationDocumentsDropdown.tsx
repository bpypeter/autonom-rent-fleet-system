
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { FileText, Download, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface ReservationDocumentsDropdownProps {
  reservationId: string;
  reservationCode: string;
  clientName: string;
}

export const ReservationDocumentsDropdown: React.FC<ReservationDocumentsDropdownProps> = ({
  reservationId,
  reservationCode,
  clientName
}) => {
  const handleDownloadContract = () => {
    // Generăm conținutul contractului
    const contractContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Contract de Închiriere - ${reservationCode}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .content { line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>CONTRACT DE ÎNCHIRIERE AUTO</h1>
          <h2>AUTONOM SERVICES SA</h2>
        </div>
        <div class="content">
          <p><strong>Cod Rezervare:</strong> ${reservationCode}</p>
          <p><strong>Client:</strong> ${clientName}</p>
          <p><strong>Data Generării:</strong> ${new Date().toLocaleDateString('ro-RO')}</p>
          
          <h3>TERMENI ȘI CONDIȚII</h3>
          <p>Prin prezentul contract, AUTONOM SERVICES SA acordă în închiriere vehiculul specificat în rezervare.</p>
          
          <h3>OBLIGAȚIILE LOCATARULUI</h3>
          <ul>
            <li>Să utilizeze vehiculul conform destinației și să respecte legislația rutieră</li>
            <li>Să returneze vehiculul în starea în care l-a primit</li>
            <li>Să achite toate amenzile și taxele generate pe perioada închirierii</li>
          </ul>
          
          <h3>SEMNĂTURI</h3>
          <p>Locator: __________________ Data: __________</p>
          <p>Locatar: __________________ Data: __________</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([contractContent], { type: 'text/html;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Contract_${reservationCode}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast.success(`Contractul pentru rezervarea ${reservationCode} a fost descărcat`);
  };

  const handleDownloadInvoice = () => {
    // Generăm conținutul facturii
    const invoiceContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Factură - ${reservationCode}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .content { line-height: 1.6; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>FACTURĂ</h1>
          <h2>AUTONOM SERVICES SA</h2>
        </div>
        <div class="content">
          <p><strong>Cod Rezervare:</strong> ${reservationCode}</p>
          <p><strong>Client:</strong> ${clientName}</p>
          <p><strong>Data Emiterii:</strong> ${new Date().toLocaleDateString('ro-RO')}</p>
          
          <table>
            <tr>
              <th>Descriere</th>
              <th>Preț</th>
            </tr>
            <tr>
              <td>Servicii de închiriere auto</td>
              <td>Conform rezervării</td>
            </tr>
          </table>
          
          <p><strong>Total de plată:</strong> Conform rezervării</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([invoiceContent], { type: 'text/html;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Factura_${reservationCode}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast.success(`Factura pentru rezervarea ${reservationCode} a fost descărcată`);
  };

  const handleDownloadPaymentConfirmation = () => {
    // Generăm conținutul confirmării de plată
    const paymentContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Confirmare Plată - ${reservationCode}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .content { line-height: 1.6; }
          .confirmation { background-color: #d4edda; padding: 15px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>CONFIRMARE PLATĂ</h1>
          <h2>AUTONOM SERVICES SA</h2>
        </div>
        <div class="content">
          <p><strong>Cod Rezervare:</strong> ${reservationCode}</p>
          <p><strong>Client:</strong> ${clientName}</p>
          <p><strong>Data Confirmării:</strong> ${new Date().toLocaleDateString('ro-RO')}</p>
          
          <div class="confirmation">
            <h3>STATUS PLATĂ: CONFIRMATĂ</h3>
            <p>Plata pentru rezervarea ${reservationCode} a fost procesată cu succes.</p>
          </div>
          
          <p><strong>Detalii tranzacție:</strong></p>
          <ul>
            <li>Suma: Conform rezervării</li>
            <li>Metoda de plată: Conform selecției</li>
            <li>Data procesării: ${new Date().toLocaleDateString('ro-RO')}</li>
          </ul>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([paymentContent], { type: 'text/html;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Confirmare_Plata_${reservationCode}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast.success(`Confirmarea de plată pentru rezervarea ${reservationCode} a fost descărcată`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 text-xs">
          <FileText className="w-3 h-3 mr-1" />
          Documente
          <ChevronDown className="w-3 h-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={handleDownloadContract}>
          <Download className="w-4 h-4 mr-2" />
          Contract
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDownloadInvoice}>
          <Download className="w-4 h-4 mr-2" />
          Factură
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDownloadPaymentConfirmation}>
          <Download className="w-4 h-4 mr-2" />
          Confirmare plată
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
