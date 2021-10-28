import React from 'react';
import { ReactComponent as LockIcon } from '../../../assets/svg/lock.svg';
import styles from './PaymentConfirmButton.module.scss';

const PaymentConfirmButton = ({
  total, onClick, disabled, label,
}:any) => (
  <button type="button" onClick={onClick} className={styles.button}>
    <div />
    <div className={styles.label}>
      <p>
        {label}
        {' '}
        {total}
      </p>
    </div>
    <div className={styles.icon}>
      <LockIcon />
    </div>
  </button>
);

export default PaymentConfirmButton;
