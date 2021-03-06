import React from 'react';
import { CheckoutNavBarIndicator } from '..';
import styles from './CheckoutNavBar.module.scss';

interface IProps {
  active: number;
  done: Record<number, boolean>;
}

const CheckoutNavBar = ({ active, done }: IProps) => (
  <div className={styles.body}>
    <div>
      <CheckoutNavBarIndicator iconNumber={1} active={active === 1} done={done[1]} caption="Your details" />
    </div>
    <div>
      <CheckoutNavBarIndicator iconNumber={2} active={active === 2} done={done[2]} caption="Payment" />
    </div>
    <div>
      <CheckoutNavBarIndicator iconNumber={3} active={active === 3} done={done[3]} caption="Confirmation" />
    </div>

  </div>
);

export default CheckoutNavBar;
