import React from 'react';
import Cookies from 'universal-cookie';
import styles from './BasketSummary.module.scss';

interface IProps {
  showShipping: boolean;
}

const BasketSummary = ({ showShipping }: IProps) => {
  const calculateTotal = (products: Array<Record<string, any>>) => {
    let total = 0;

    products.forEach((product) => { total += product.unit_price; });

    return total;
  };

  const cookies = new Cookies();
  const cookie = cookies.get('order');
  const { shipping } = cookie.order;
  const { address } = shipping;
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
        {showShipping
          ? (
            <div className={styles.shipping}>
              <h3>Shipping Details</h3>
              <div className={styles.info}>
                <p className={styles.names}>
                  {shipping.first_name}
                  {' '}
                  {shipping.last_name}
                </p>
                <p className={styles.address}>
                  {address.street_number}
                  {' '}
                  {address.street}
                  {', '}
                  {address.city}
                  {', '}
                  {address.postcode}
                  {', '}
                  {address.country_code}
                </p>
                <p className={styles.address}>
                  {shipping.shipping_method}
                  {' delivery'}
                </p>
              </div>
            </div>
          )
          : null}
      </div>
    </div>
  );
};

export default BasketSummary;
