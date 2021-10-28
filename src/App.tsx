import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import Checkout from './pages/Checkout/Checkout';

function App() {
  // Dummy order, populated during shopping, saved in cookies, id generated at payment intent
  const order = {
    id: '',
    products: [{
      code: 'nike147', desc: 'Old school Nike dunks in blue', name: 'Nike Dunks Retro', quantity: 1, unit_price: 310.00,
    }],
    shipping: {
      address: {
        city: 'Shanghai',
        country_code: 'CN',
        postcode: '10000',
        state: 'Shanghai',
        street: 'East Street',
        street_number: '20A',
      },
      first_name: 'John',
      last_name: 'Smith',
      phone_number: '02109834710',
      email_address: 'john.doe@gmail.com',
      shipping_method: 'Overnight',
    },
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/checkout"><Checkout order={order} /></Route>
        <Route path="/"><Redirect to="/checkout" /></Route>
      </Switch>
    </Router>
  );
}

export default App;
