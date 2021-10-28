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
  return (
    <Router>
      <Switch>
        <Route exact path="/checkout" component={Checkout} />
        <Route path="/"><Redirect to="/checkout" /></Route>
      </Switch>
    </Router>
  );
}

export default App;
