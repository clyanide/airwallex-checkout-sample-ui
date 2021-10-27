import React from 'react';
import { CheckoutNavBarButton } from '../../buttons';
import styles from './CheckoutNavBar.module.scss';

const CheckoutNavBar = () => (
  <div className={styles.background}>
    <div>
      <CheckoutNavBarButton iconNumber={1} active caption="Your details" />
    </div>
    <div>
      <CheckoutNavBarButton />
    </div>
    <div>
      <CheckoutNavBarButton />
    </div>

  </div>
);

export default CheckoutNavBar;
