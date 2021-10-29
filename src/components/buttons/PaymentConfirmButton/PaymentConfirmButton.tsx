import React from 'react';
import { ReactComponent as LockIcon } from '../../../assets/svg/lock.svg';
import styles from './PaymentConfirmButton.module.scss';

interface IProps {
  total: string;
  onClick: React.MouseEventHandler;
  disabled: boolean;
  label: string;
}
const PaymentConfirmButton = ({
  total, onClick, disabled, label,
}:IProps) => (
  <button type="button" onClick={disabled ? () => { console.log('Button disabled'); } : onClick} className={disabled ? styles.inactive : styles.active}>
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
