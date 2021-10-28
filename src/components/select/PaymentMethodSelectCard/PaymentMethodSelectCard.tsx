import React from 'react';
import styles from './PaymentMethodSelectCard.module.scss';

const PaymentMethodSelectCard = ({ paymentMethod, selected, onClick }: any) => (
  <button type="button" className={selected ? styles.active : styles.inactive} onClick={onClick}>
    {paymentMethod}
  </button>
);

export default PaymentMethodSelectCard;
