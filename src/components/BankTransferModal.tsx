
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRightLeft, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface BankTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransferComplete: () => void;
  amount: number;
}

export const BankTransferModal: React.FC<BankTransferModalProps> = ({
  isOpen,
  onClose,
  onTransferComplete,
  amount
}) => {
  const [copied, setCopied] = useState<string | null>(null);

  const bankDetails = {
    bankName: 'Banca Transilvania',
    accountHolder: 'SC RENT CAR SRL',
    iban: 'RO49BTRLRONCRT0123456789',
    bic: 'BTRLRO22',
    reference: `REZ-${Date.now().toString().slice(-6)}`
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    toast.success('Copiat în clipboard!');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleConfirmTransfer = () => {
    toast.success('Instrucțiunile de transfer au fost salvate. Rezervarea va fi confirmată după primirea plății.');
    onTransferComplete();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5" />
            Transfer Bancar
          </DialogTitle>
          <DialogDescription>
            Utilizați datele de mai jos pentru a efectua transferul de {amount} RON
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Nume Bancă</p>
                    <p className="font-medium">{bankDetails.bankName}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(bankDetails.bankName, 'bank')}
                  >
                    {copied === 'bank' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Beneficiar</p>
                    <p className="font-medium">{bankDetails.accountHolder}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(bankDetails.accountHolder, 'holder')}
                  >
                    {copied === 'holder' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">IBAN</p>
                    <p className="font-medium font-mono text-sm">{bankDetails.iban}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(bankDetails.iban, 'iban')}
                  >
                    {copied === 'iban' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">BIC/SWIFT</p>
                    <p className="font-medium">{bankDetails.bic}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(bankDetails.bic, 'bic')}
                  >
                    {copied === 'bic' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Referință (obligatorie)</p>
                    <p className="font-medium">{bankDetails.reference}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(bankDetails.reference, 'reference')}
                  >
                    {copied === 'reference' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm font-medium text-center">Sumă de plată: {amount} RON</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Instrucțiuni importante:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Includeți obligatoriu referința în descrierea transferului</li>
              <li>• Transferul poate dura 1-3 zile lucrătoare</li>
              <li>• Rezervarea va fi confirmată după primirea plății</li>
              <li>• Veți primi o confirmare prin email</li>
            </ul>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Anulează
            </Button>
            <Button onClick={handleConfirmTransfer} className="flex-1">
              Am Înțeles, Trimit Rezervarea
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
