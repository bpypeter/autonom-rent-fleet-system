
import React from 'react';
import { CardPaymentModal } from '@/components/CardPaymentModal';
import { BankTransferModal } from '@/components/BankTransferModal';
import { CashPaymentModal } from '@/components/CashPaymentModal';

interface ReservationModalsProps {
  showCardModal: boolean;
  showBankModal: boolean;
  showCashModal: boolean;
  amount: number;
  reservationCode: string;
  onCloseCardModal: () => void;
  onCloseBankModal: () => void;
  onCloseCashModal: () => void;
  onCardPaymentComplete: () => void;
  onBankTransferComplete: () => void;
  onCashPaymentComplete: () => void;
}

export const ReservationModals: React.FC<ReservationModalsProps> = ({
  showCardModal,
  showBankModal,
  showCashModal,
  amount,
  reservationCode,
  onCloseCardModal,
  onCloseBankModal,
  onCloseCashModal,
  onCardPaymentComplete,
  onBankTransferComplete,
  onCashPaymentComplete
}) => {
  const handleCardPaymentComplete = () => {
    console.log('ReservationModals - Card payment completed, calling onCardPaymentComplete');
    onCardPaymentComplete();
  };

  const handleBankTransferComplete = () => {
    console.log('ReservationModals - Bank transfer completed, calling onBankTransferComplete');
    onBankTransferComplete();
  };

  const handleCashPaymentComplete = () => {
    console.log('ReservationModals - Cash payment completed, calling onCashPaymentComplete');
    onCashPaymentComplete();
  };

  return (
    <>
      <CardPaymentModal
        isOpen={showCardModal}
        onClose={onCloseCardModal}
        amount={amount}
        reservationCode={reservationCode}
        onPaymentComplete={handleCardPaymentComplete}
      />

      <BankTransferModal
        isOpen={showBankModal}
        onClose={onCloseBankModal}
        amount={amount}
        reservationCode={reservationCode}
        onTransferComplete={handleBankTransferComplete}
      />

      <CashPaymentModal
        isOpen={showCashModal}
        onClose={onCloseCashModal}
        amount={amount}
        reservationCode={reservationCode}
        onPaymentComplete={handleCashPaymentComplete}
      />
    </>
  );
};
