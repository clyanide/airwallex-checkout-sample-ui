import React from 'react';
import { ReactComponent as LockIcon } from '../../../assets/svg/lock.svg';

const PaymentConfirmButton = ({ total }:any) => (
  <button type="button">
    <LockIcon />
    Confirm payment
    {' '}
    {total}
  </button>
);

export default PaymentConfirmButton;
