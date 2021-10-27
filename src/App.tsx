import React from 'react';
import { CardPayment } from './components/data-display';
import { CheckoutNavBar } from './components/navigation';
import { PaymentMethodSelect } from './components/select';

function App() {
  const paymentMethods = ['Card', 'Paypal', 'WeChat'];
  return (
    <PaymentMethodSelect paymentMethods={paymentMethods} selectedIndex={0} />
  );
}

export default App;
