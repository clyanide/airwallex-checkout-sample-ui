import React, { useState } from 'react';
import styles from './YourDetails.module.scss';

const YourDetails = ({ setDetailsConfirmed }: any) => {
  // Dummy order populated during shopping and completing details and persisted in cookies
  const [order, setOrder] = useState({
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
  });

  const handleNextButton = () => {
    // TODO: Create intent using order and auth token
    setDetailsConfirmed();
  };
  return (
    <div className={styles.body}>
      <div>Imagine you have already entered your details on this page</div>
      <button type="button" onClick={handleNextButton}>Next</button>
    </div>
  );
};

export default YourDetails;
