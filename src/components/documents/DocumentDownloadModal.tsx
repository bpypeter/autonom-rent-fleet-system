
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

  const generateDocument = (documentType: string) => {
    // În practică, aici ar fi apelul către API pentru generarea documentului
    const doc = documents.find(d => d.id === documentType);
    if (doc) {
      // Simulare descărcare
      toast.success(`Se descarcă ${doc.title}...`);
      
      // Aici ar fi logica de generare și descărcare efectivă
      console.log(`Generating ${documentType} for reservation ${reservationCode}, client: ${clientName}`);
      
      // Pentru demonstrație, creez un link de download fake
      const link = document.createElement('a');
      link.href = '#'; // În practică ar fi URL-ul documentului generat
      link.download = doc.filename;
      link.click();
    }
  };

  const downloadAllDocuments = () => {
    toast.success('Se descarcă toate documentele...');
    documents.forEach(doc => {
      setTimeout(() => generateDocument(doc.id), Math.random() * 1000);
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
