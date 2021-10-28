import React from 'react';
import { ReactComponent as LeftChevronIcon } from '../../../assets/svg/left-chevron.svg';
import styles from './PaymentBackButton.module.scss';

const PaymentBackButton = ({ onClick }: any) => (
  <button type="button" onClick={onClick} className={styles.button}>
    <div>
      <LeftChevronIcon />
    </div>
    Back
    <div />
  </button>
);

export default PaymentBackButton;
