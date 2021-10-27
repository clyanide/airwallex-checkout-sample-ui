import React from 'react';
import { ReactComponent as LeftChevronIcon } from '../../../assets/svg/left-chevron.svg';
import styles from './PaymentBackButton.module.scss';

const PaymentBackButton = () => (
  <button type="button">
    <LeftChevronIcon />
    Back
  </button>
);

export default PaymentBackButton;
