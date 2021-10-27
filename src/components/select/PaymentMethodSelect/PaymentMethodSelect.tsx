import React from 'react';
import styles from './PaymentMethodSelect.module.scss';

const PaymentMethodSelect = ({ paymentMethods, selectedIndex }: any) => (
  <div>
    {paymentMethods.map((method: any, index: any) => (
      <div
        className={index === selectedIndex ? styles.active : styles.inactive}
      >
        <p>{method}</p>
      </div>
    ))}
  </div>
);

export default PaymentMethodSelect;
