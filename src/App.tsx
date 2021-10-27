import React from 'react';
import { CheckoutNavBar } from './components/navigation';
import { PaymentMethodSelect } from './components/select';
import { PaymentBackButton, PaymentConfirmButton } from './components/buttons';
import Checkout from './pages/Checkout/Checkout';

function App() {
  const paymentMethods = ['Card', 'Paypal', 'WeChat'];
  return (
    <Checkout />
  );
}

export default App;
