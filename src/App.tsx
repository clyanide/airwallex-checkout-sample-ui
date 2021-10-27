import React from 'react';
import { CardPayment } from './components/data-display';
import { CheckoutNavBar } from './components/navigation';
import { PaymentMethodSelect } from './components/select';
import { PaymentBackButton, PaymentConfirmButton } from './components/buttons';

function App() {
  const paymentMethods = ['Card', 'Paypal', 'WeChat'];
  return (
    <CardPayment />
  );
}

export default App;
