import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import styles from './YourDetails.module.scss';
import { TextField } from '../../inputs';

interface IProps {
  setDetailsConfirmed: CallableFunction
}

const cookies = new Cookies();

const YourDetails = ({ setDetailsConfirmed }: IProps) => {
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '', lastName: '', phone: '', email: '',
  });

  const [shippingDetails, setShippingDetails] = useState({
    number: '', street: '', state: '', city: '', postCode: '', country: '',
  });

  const handleNextButton = () => {
    const orderCookie = cookies.get('order');
    const { order } = orderCookie;

    const {
      firstName, lastName, phone, email,
    } = customerDetails;

    const {
      number, street, state, city, postCode, country,
    } = shippingDetails;

    order.shipping.first_name = firstName;
    order.shipping.last_name = lastName;
    order.shipping.phone_number = phone;
    order.shipping.email_address = email;

    const { address } = order.shipping;

    address.city = city;
    address.country_code = country; // need to convert to country code
    address.postcode = postCode;
    address.state = state;
    address.street = street;
    address.street_number = number;

    console.log(orderCookie);
    cookies.set('order', orderCookie, { path: '/' });

    setDetailsConfirmed();
  };

  return (
    <div className={styles.body}>
      <p>Your Details</p>
      <div className={styles.row1}>
        <TextField
          label="First Name"
          id="firstName"
          error={false}
          errorMessage=""
          mountable={false}
          value={customerDetails.firstName}
          onChange={(e) => setCustomerDetails({
            ...customerDetails,
            firstName: e.target.value,
          })}
        />
        <TextField
          label="Last Name"
          id="lastName"
          error={false}
          errorMessage=""
          mountable={false}
          value={customerDetails.lastName}
          onChange={(e) => setCustomerDetails({
            ...customerDetails,
            lastName: e.target.value,
          })}
        />
      </div>
      <div className={styles.row2}>
        <TextField
          label="Phone Number"
          id="phone"
          error={false}
          errorMessage=""
          mountable={false}
          value={customerDetails.phone}
          onChange={(e) => setCustomerDetails({
            ...customerDetails,
            phone: e.target.value,
          })}
        />
        <TextField
          label="Email Address"
          id="email"
          error={false}
          errorMessage=""
          mountable={false}
          value={customerDetails.email}
          onChange={(e) => setCustomerDetails({
            ...customerDetails,
            email: e.target.value,
          })}
        />
      </div>
      <p>Shipping Information</p>
      <div className={styles.row3}>
        <TextField
          label="Street Number"
          id="streetNumber"
          error={false}
          errorMessage=""
          mountable={false}
          value={shippingDetails.number}
          onChange={(e) => setShippingDetails({
            ...shippingDetails,
            number: e.target.value,
          })}
        />
        <TextField
          label="Street Name"
          id="street"
          error={false}
          errorMessage=""
          mountable={false}
          value={shippingDetails.street}
          onChange={(e) => setShippingDetails({
            ...shippingDetails,
            street: e.target.value,
          })}
        />

      </div>
      <div className={styles.row4}>
        <TextField
          label="State"
          id="state"
          error={false}
          errorMessage=""
          mountable={false}
          value={shippingDetails.state}
          onChange={(e) => setShippingDetails({
            ...shippingDetails,
            state: e.target.value,
          })}
        />
        <TextField
          label="City"
          id="city"
          error={false}
          errorMessage=""
          mountable={false}
          value={shippingDetails.city}
          onChange={(e) => setShippingDetails({
            ...shippingDetails,
            city: e.target.value,
          })}
        />
        <TextField
          label="Post Code"
          id="postCode"
          error={false}
          errorMessage=""
          mountable={false}
          value={shippingDetails.postCode}
          onChange={(e) => setShippingDetails({
            ...shippingDetails,
            postCode: e.target.value,
          })}
        />
      </div>
      <div className={styles.row5}>
        <TextField
          label="Country"
          id="country"
          error={false}
          errorMessage=""
          mountable={false}
          value={shippingDetails.country}
          onChange={(e) => setShippingDetails({
            ...shippingDetails,
            country: e.target.value,
          })}
        />
        <p>[SelectShippingMethod]</p>
      </div>
      <button type="button" onClick={handleNextButton}>Continue</button>
    </div>
  );
};

export default YourDetails;
