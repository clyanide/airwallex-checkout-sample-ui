import React from 'react';
import { ReactComponent as LeftChevronIcon } from '../../../assets/svg/left-chevron.svg';
import styles from './PaymentBackButton.module.scss';

interface IProps {
  onClick: React.MouseEventHandler;
}

const PaymentBackButton = ({ onClick }: IProps) => (
  <button type="button" onClick={onClick} className={styles.button}>
    <div>
      <LeftChevronIcon />
    </div>
    Back
    <div />
  </button>
);

export default PaymentBackButton;
