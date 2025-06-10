
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Download, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaymentSuccessMessageProps {
  isVisible: boolean;
  paymentMethod: string;
  reservationCode: string;
}

export const PaymentSuccessMessage: React.FC<PaymentSuccessMessageProps> = ({
  isVisible,
  paymentMethod,
  reservationCode
}) => {
  const navigate = useNavigate();

  if (!isVisible) return null;

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'cash':
        return 'numerar';
      case 'card':
        return 'card bancar';
      case 'transfer':
        return 'transfer bancar';
      default:
        return method;
    }
  };

  const handleGoToReservations = () => {
    navigate('/reservations');
  };

  return (
    <div className="mt-4 space-y-4">
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <div className="space-y-3">
            <p className="font-medium">
              Rezervarea {reservationCode} a fost confirmată cu plata prin {getPaymentMethodText(paymentMethod)}!
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <p className="font-medium text-blue-900">Pasul următor: Completați documentele necesare</p>
                  <p className="text-sm text-blue-800">
                    Pentru a finaliza rezervarea, mergeți la secțiunea <strong>Rezervări</strong> unde puteți:
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1 ml-4">
                    <li className="flex items-center gap-2">
                      <Download className="h-3 w-3" />
                      Descărcați documentele (Contract, Declarație, Acord GDPR)
                    </li>
                    <li className="flex items-center gap-2">
                      <Upload className="h-3 w-3" />
                      Încărcați documentele completate și semnate
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleGoToReservations}
              className="w-full"
            >
              <FileText className="h-4 w-4 mr-2" />
              Mergi la Rezervări pentru documente
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};
