import React from 'react';
import { CheckoutNavBarIndicator } from '..';
import styles from './CheckoutNavBar.module.scss';

const CheckoutNavBar = () => (
  <div className={styles.background}>
    <div>
      <CheckoutNavBarIndicator iconNumber={1} active caption="Your details" />
    </div>
    <div>
      <CheckoutNavBarIndicator />
    </div>
    <div>
      <CheckoutNavBarIndicator />
    </div>

  </div>
);

export default CheckoutNavBar;
