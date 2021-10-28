import React, { useState, useEffect } from 'react';
import { Payment, BasketSummary, Confirmation } from '../../components/checkout';
import { CheckoutNavBar, Header } from '../../components/navigation';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(2);
  const [doneSteps, setDoneSteps] = useState({ 1: true, 2: false, 3: false });
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handlePaymentConfirmation = (confirmed: any) => {
    setPaymentConfirmed(confirmed);
    setDoneSteps({ ...doneSteps, 2: true });
    setActiveStep(3);
  };

  return (
    <div>
      <Header />
      <div>
        <CheckoutNavBar active={activeStep} done={doneSteps} />
        {paymentConfirmed ? <Confirmation />
          : <Payment setPaymentConfirmed={handlePaymentConfirmation} /> }
        <BasketSummary />
      </div>
    </div>
  );
};

export default Checkout;
