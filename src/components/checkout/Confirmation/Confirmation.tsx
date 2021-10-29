import React from 'react';
import styles from './Confirmation.module.scss';
import { ReactComponent as CheckIcon } from '../../../assets/svg/check.svg';

interface IProps {
  handleOrderPlaced: CallableFunction
}

const Confirmation = ({ handleOrderPlaced }: IProps) => {
  const handleContinueButton = () => { handleOrderPlaced(); };
  return (
    <div className={styles.body}>
      <div><CheckIcon /></div>
      <p>Thank you! Your order has been placed.</p>
      <button onClick={handleContinueButton} type="button">Continue Shopping</button>
    </div>
  );
};

export default Confirmation;
