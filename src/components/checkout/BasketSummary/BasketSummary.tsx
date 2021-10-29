import React from 'react';
import styles from './BasketSummary.module.scss';

const items = [{ name: 'Nike Air Max', description: 'Newest air max shoes', price: '$123.45' }, { name: 'Nike Air Max', description: 'Newest air max shoes', price: '$123.45' }, { name: 'Nike Air Max', description: 'Newest air max shoes', price: '$123.45' }, { name: 'Nike Air Max', description: 'Newest air max shoes', price: '$123.45' }, { name: 'Nike Air Max', description: 'Newest air max shoes', price: '$123.45' }, { name: 'Nike Air Max', description: 'Newest air max shoes', price: '$123.45' }];

const BasketSummary = () => (
  <div className={styles.body}>
    <div className={styles.content}>
      <div className={styles.basket}>
        <h3>Basket Summary</h3>
        <div className={styles.items}>
          {items.map((item) => (
            <div className={styles.entry}>
              <div className={styles.text}>
                <p className={styles.title}>{item.name}</p>
                <p className={styles.description}>{item.description}</p>
              </div>
              <div className={styles.price}>{item.price}</div>
            </div>
          ))}
        </div>
        <div className={styles.total}>
          <h3>Total</h3>
          <h3>$100</h3>
        </div>
      </div>
      <div className={styles.shipping}>
        <h3>Shipping Details</h3>
        <div className={styles.info}>
          <p className={styles.names}>First Last</p>
          <p className={styles.address}>20A Oliver Twist Avenue, Auckland, 2014</p>
        </div>
      </div>
    </div>
  </div>
);

export default BasketSummary;
