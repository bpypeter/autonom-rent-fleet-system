import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, FileText, Shield, ScrollText } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservationCode: string;
  clientName: string;
}

export const DocumentDownloadModal: React.FC<DocumentDownloadModalProps> = ({
  isOpen,
  onClose,
  reservationCode,
  clientName
}) => {
  const documents = [
    {
      id: 'contract',
      title: 'Contract de Închiriere',
      description: 'Contract principal pentru închirierea vehiculului',
      icon: FileText,
      filename: `Contract_${reservationCode}.pdf`
    },
    {
      id: 'declaration',
      title: 'Declarație pe Propria Răspundere',
      description: 'Declarație privind starea vehiculului și condițiile de utilizare',
      icon: ScrollText,
      filename: `Declaratie_${reservationCode}.pdf`
    },
    {
      id: 'gdpr',
      title: 'Acord GDPR',
      description: 'Acordul pentru prelucrarea datelor personale',
      icon: Shield,
      filename: `Acord_GDPR_${reservationCode}.pdf`
    }
  ];

  const generatePDFContent = (documentType: string) => {
    const doc = documents.find(d => d.id === documentType);
    if (!doc) return '';

    // Generez conținut HTML pentru PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${doc.title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
          .company-name { font-size: 24px; font-weight: bold; color: #333; }
          .document-title { font-size: 20px; margin-top: 10px; }
          .section { margin: 20px 0; }
          .section-title { font-weight: bold; font-size: 16px; margin-bottom: 10px; }
          .signature-area { margin-top: 50px; display: flex; justify-content: space-between; }
          .signature-box { width: 200px; text-align: center; }
          .signature-line { border-top: 1px solid #333; margin-top: 50px; padding-top: 5px; }
          .footer { margin-top: 50px; font-size: 12px; color: #666; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name">AUTONOM SERVICES SA</div>
          <div>Str. Exemplu Nr. 123, București, România</div>
          <div>Tel: +40 21 123 4567 | Email: office@autonom.ro</div>
          <div class="document-title">${doc.title}</div>
        </div>

        <div class="section">
          <div class="section-title">Informații Rezervare:</div>
          <p><strong>Cod Rezervare:</strong> ${reservationCode}</p>
          <p><strong>Client:</strong> ${clientName}</p>
          <p><strong>Data Generare:</strong> ${new Date().toLocaleDateString('ro-RO')}</p>
        </div>

        ${documentType === 'contract' ? `
        <div class="section">
          <div class="section-title">1. PĂRȚILE CONTRACTANTE</div>
          <p><strong>LOCATORUL:</strong> AUTONOM SERVICES SA</p>
          <p><strong>LOCATARUL:</strong> ${clientName}</p>
        </div>

        <div class="section">
          <div class="section-title">2. OBIECTUL CONTRACTULUI</div>
          <p>Prezentul contract are ca obiect închirierea vehiculului specificat în rezervarea ${reservationCode}.</p>
        </div>

        <div class="section">
          <div class="section-title">3. OBLIGAȚIILE PĂRȚILOR</div>
          <p><strong>Locatorul se obligă să:</strong></p>
          <ul>
            <li>Predea vehiculul în stare tehnică corespunzătoare</li>
            <li>Furnizeze documentele necesare utilizării vehiculului</li>
            <li>Asigure asistența tehnică în caz de defecțiuni</li>
          </ul>
          <p><strong>Locatarul se obligă să:</strong></p>
          <ul>
            <li>Utilizeze vehiculul conform destinației și instrucțiunilor</li>
            <li>Restituie vehiculul în aceeași stare în care l-a primit</li>
            <li>Achite chiria și eventualele penalități</li>
          </ul>
        </div>
        ` : ''}

        ${documentType === 'declaration' ? `
        <div class="section">
          <div class="section-title">DECLARAȚIE PE PROPRIA RĂSPUNDERE</div>
          <p>Subsemnatul/a ${clientName}, declar pe propria răspundere că:</p>
          <ul>
            <li>Dețin permis de conducere valabil pentru categoria vehiculului închiriat</li>
            <li>Nu mă aflu sub influența alcoolului sau a substanțelor psihoactive</li>
            <li>Voi utiliza vehiculul conform legii și contractului de închiriere</li>
            <li>Îmi asum răspunderea pentru eventualele daune cauzate prin neglijența mea</li>
          </ul>
        </div>
        ` : ''}

        ${documentType === 'gdpr' ? `
        <div class="section">
          <div class="section-title">ACORD PENTRU PRELUCRAREA DATELOR PERSONALE</div>
          <p>În conformitate cu Regulamentul General privind Protecția Datelor (GDPR), prin prezenta îmi exprim acordul pentru prelucrarea datelor personale de către AUTONOM SERVICES SA.</p>
          
          <div class="section-title">Date prelucrate:</div>
          <ul>
            <li>Date de identificare (nume, prenume, CNP)</li>
            <li>Date de contact (adresă, telefon, email)</li>
            <li>Date privind permisul de conducere</li>
          </ul>

          <div class="section-title">Scopul prelucrării:</div>
          <ul>
            <li>Încheierea și executarea contractului de închiriere</li>
            <li>Îndeplinirea obligațiilor legale</li>
            <li>Comunicarea cu clientul</li>
          </ul>
        </div>
        ` : ''}

        <div class="signature-area">
          <div class="signature-box">
            <div class="signature-line">Semnătura Client</div>
          </div>
          <div class="signature-box">
            <div class="signature-line">Semnătura Reprezentant</div>
          </div>
        </div>

        <div class="footer">
          Document generat automat - ${new Date().toLocaleString('ro-RO')}
        </div>
      </body>
      </html>
    `;

    return htmlContent;
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename.replace('.pdf', '.html'); // Salvăm ca HTML pentru că nu avem biblioteca PDF
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateDocument = (documentType: string) => {
    const doc = documents.find(d => d.id === documentType);
    if (doc) {
      const content = generatePDFContent(documentType);
      downloadFile(content, doc.filename);
      toast.success(`${doc.title} a fost descărcat cu succes!`);
      
      console.log(`Generating ${documentType} for reservation ${reservationCode}, client: ${clientName}`);
    }
  };

  const downloadAllDocuments = () => {
    toast.success('Se descarcă toate documentele...');
    
    // Descarcă fiecare document cu o întârziere scurtă pentru a evita blocarea browser-ului
    documents.forEach((doc, index) => {
      setTimeout(() => {
        generateDocument(doc.id);
      }, index * 500); // 500ms întârziere între fiecare descărcare
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Descărcare Documente - {reservationCode}
          </DialogTitle>
          <DialogDescription>
            Descărcați documentele necesare pentru rezervarea dvs.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="font-medium text-blue-900">Instrucțiuni:</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Descărcați și printați toate documentele</li>
                  <li>• Completați și semnați în spațiile marcate</li>
                  <li>• Scanați sau fotografiați documentele completate</li>
                  <li>• Încărcați-le folosind opțiunea "Încarcă documente completate"</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Documente disponibile:</h4>
              <Button onClick={downloadAllDocuments} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Descarcă toate
              </Button>
            </div>
            
            <div className="space-y-3">
              {documents.map(doc => {
                const IconComponent = doc.icon;
                return (
                  <Card key={doc.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <IconComponent className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-sm">{doc.title}</h5>
                            <p className="text-xs text-muted-foreground mt-1">
                              {doc.description}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => generateDocument(doc.id)}
                          size="sm"
                          variant="outline"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Descarcă
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-muted-foreground bg-gray-50 border rounded-lg p-3">
            <p className="font-medium mb-1">Notă:</p>
            <p>
              Documentele sunt personalizate pentru rezervarea {reservationCode} și 
              conțin informațiile specifice ale companiei AUTONOM SERVICES SA. 
              Toate documentele trebuie completate și returnate pentru finalizarea rezervării.
              Documentele vor fi descărcate în format HTML care poate fi convertit în PDF.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Închide
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
