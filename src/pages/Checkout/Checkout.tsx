import React, { useState, useEffect } from 'react';
import {
  Payment,
  BasketSummary,
  Confirmation,
  YourDetails,
} from '../../components/checkout';
import { CheckoutNavBar, Header } from '../../components/navigation';
import styles from './Checkout.module.scss';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [doneSteps, setDoneSteps] = useState({ 1: false, 2: false, 3: false });
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [detailsConfirmed, setDetailsConfirmed] = useState(false);

  const handlePaymentConfirmation = () => {
    setPaymentConfirmed(true);
    setDoneSteps({ ...doneSteps, 2: true });
    setActiveStep(3);
  };

  const handleDetailsConfirmation = () => {
    setDetailsConfirmed(true);
    setDoneSteps({ ...doneSteps, 1: true });
    setActiveStep(2);
  };

  // Would normally take customer back to home page
  const handleOrderPlaced = () => {
    setPaymentConfirmed(false);
    setDetailsConfirmed(false);
    setDoneSteps({
      ...doneSteps, 1: false, 2: false, 3: false,
    });
    setActiveStep(1);
  };

  const getStepComponent = () => {
    if (!detailsConfirmed) {
      return <YourDetails setDetailsConfirmed={handleDetailsConfirmation} />;
    }
    if (!paymentConfirmed) {
      return <Payment setPaymentConfirmed={handlePaymentConfirmation} />;
    }
    if (paymentConfirmed) {
      return <Confirmation handleOrderPlaced={handleOrderPlaced} />;
    }

    return undefined;
  };

  return (
    <div className={styles.body}>
      <Header />
      <div className={styles.content}>
        <CheckoutNavBar active={activeStep} done={doneSteps} />
        {getStepComponent()}
        <BasketSummary />
      </div>
    </div>
  );
};

export default Checkout;
