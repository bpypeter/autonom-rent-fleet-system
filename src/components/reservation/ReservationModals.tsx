
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
  return (
    <>
      <CardPaymentModal
        isOpen={showCardModal}
        onClose={onCloseCardModal}
        amount={amount}
        reservationCode={reservationCode}
        onPaymentComplete={onCardPaymentComplete}
      />

      <BankTransferModal
        isOpen={showBankModal}
        onClose={onCloseBankModal}
        amount={amount}
        reservationCode={reservationCode}
        onTransferComplete={onBankTransferComplete}
      />

      <CashPaymentModal
        isOpen={showCashModal}
        onClose={onCloseCashModal}
        amount={amount}
        reservationCode={reservationCode}
        onPaymentComplete={onCashPaymentComplete}
      />
    </>
  );
};
