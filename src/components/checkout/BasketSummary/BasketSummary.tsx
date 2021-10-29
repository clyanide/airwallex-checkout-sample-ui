import React from 'react';
import Cookies from 'universal-cookie';
import styles from './BasketSummary.module.scss';

const items = [{ name: 'Nike Air Max', description: 'Newest air max shoes', price: '$123.45' }, { name: 'Nike Air Max', description: 'Newest air max shoes', price: '$123.45' }, { name: 'Nike Air Max', description: 'Newest air max shoes', price: '$123.45' }, { name: 'Nike Air Max', description: 'Newest air max shoes', price: '$123.45' }, { name: 'Nike Air Max', description: 'Newest air max shoes', price: '$123.45' }, { name: 'Nike Air Max', description: 'Newest air max shoes', price: '$123.45' }];

const BasketSummary = () => {
  const calculateTotal = (products: Array<Record<string, any>>) => {
    let total = 0;

    products.forEach((product) => { total += product.unit_price; });

    return total;
  };

  const cookies = new Cookies();
  const cookie = cookies.get('order');
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.basket}>
          <h3>Basket Summary</h3>
          <div className={styles.items}>
            {cookie.order.products.map((item: any) => (
              <div className={styles.entry}>
                <div className={styles.text}>
                  <p className={styles.title}>{item.name}</p>
                  <p className={styles.description}>{item.desc}</p>
                </div>
                <div className={styles.price}>
                  {(Math.round(item.unit_price * 100) / 100)
                    .toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.total}>
            <h3>Total</h3>
            <h3>{(Math.round(calculateTotal(cookie.order.products) * 100) / 100).toFixed(2)}</h3>
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
};

export default BasketSummary;
