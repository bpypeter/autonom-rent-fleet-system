
import React from 'react';
import { CardPaymentModal } from '@/components/CardPaymentModal';
import { BankTransferModal } from '@/components/BankTransferModal';
import { CashPaymentModal } from '@/components/CashPaymentModal';

interface ReservationModalsProps {
  showCardModal: boolean;
  showBankModal: boolean;
  showCashModal: boolean;
  amount: number;
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
        onPaymentComplete={onCardPaymentComplete}
      />

      <BankTransferModal
        isOpen={showBankModal}
        onClose={onCloseBankModal}
        amount={amount}
        onTransferComplete={onBankTransferComplete}
      />

      <CashPaymentModal
        isOpen={showCashModal}
        onClose={onCloseCashModal}
        amount={amount}
        onPaymentComplete={onCashPaymentComplete}
      />
    </>
  );
};
