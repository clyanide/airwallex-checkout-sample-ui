import React from 'react';
import { ReactComponent as LockIcon } from '../../../assets/svg/lock.svg';

const PaymentConfirmButton = ({
  total, onClick, disabled, label,
}:any) => (
  <button type="button" onClick={onClick}>
    <LockIcon />
    {label}
    {' '}
    {total}
  </button>
);

export default PaymentConfirmButton;
