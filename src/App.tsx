import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Checkout from './pages/Checkout/Checkout';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/checkout"><Checkout /></Route>
        <Route path="/"><Redirect to="/checkout" /></Route>
      </Switch>
    </Router>
  );
}

export default App;
