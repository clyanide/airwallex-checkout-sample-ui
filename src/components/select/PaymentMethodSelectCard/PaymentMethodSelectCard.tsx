import React from 'react';
import styles from './PaymentMethodSelectCard.module.scss';

interface IProps {
  paymentMethod: string;
  selected: boolean;
  onClick: React.MouseEventHandler;
}

const PaymentMethodSelectCard = ({ paymentMethod, selected, onClick }: IProps) => (
  <button type="button" className={selected ? styles.active : styles.inactive} onClick={onClick}>
    {paymentMethod}
  </button>
);

export default PaymentMethodSelectCard;
