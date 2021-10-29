import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Checkout from './pages/Checkout/Checkout';

import { setDummyOrderCookie } from './dummy/cookies'; // Simulates customer adding items to cart during shopping

function App() {
  setDummyOrderCookie();
  return (
    <Router>
      <Switch>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route path="/">
          <Redirect to="/checkout" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
