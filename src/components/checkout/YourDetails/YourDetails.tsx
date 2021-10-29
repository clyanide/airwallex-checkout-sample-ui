import React, { ChangeEvent, useState } from 'react';
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

  const [inputComplete, setInputComplete] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    number: false,
    street: false,
    state: false,
    city: false,
    postCode: false,
    country: false,
  });

  const [inputErrorMessage, setInputErrorMessage] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    number: '',
    street: '',
    state: '',
    city: '',
    postCode: '',
    country: '',
  });

  const allElementsComplete = inputComplete.firstName && inputComplete.lastName
   && inputComplete.phone && inputComplete.email && inputComplete.number
  && inputComplete.street && inputComplete.state && inputComplete.city
  && inputComplete.postCode && inputComplete.country;

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

  const handleOnChange = (e : ChangeEvent<HTMLInputElement>, type: string, field: string) => {
    if (type === 'customer') {
      setCustomerDetails({ ...customerDetails, [field]: e.target.value });
    } else if (type === 'shipping') {
      setShippingDetails({ ...shippingDetails, [field]: e.target.value });
    }

    if (e.target.value !== '') {
      setInputComplete({ ...inputComplete, [field]: true });
    } else { setInputComplete({ ...inputComplete, [field]: false }); }
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
          onChange={(e) => handleOnChange(e, 'customer', 'firstName')}
        />
        <TextField
          label="Last Name"
          id="lastName"
          error={false}
          errorMessage=""
          mountable={false}
          value={customerDetails.lastName}
          onChange={(e) => handleOnChange(e, 'customer', 'lastName')}
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
          onChange={(e) => handleOnChange(e, 'customer', 'phone')}
        />
        <TextField
          label="Email Address"
          id="email"
          error={false}
          errorMessage=""
          mountable={false}
          value={customerDetails.email}
          onChange={(e) => handleOnChange(e, 'customer', 'email')}
        />
      </div>
      <p>Shipping Information</p>
      <div className={styles.row3}>
        <TextField
          label="Street Number"
          id="number"
          error={false}
          errorMessage=""
          mountable={false}
          value={shippingDetails.number}
          onChange={(e) => handleOnChange(e, 'shipping', 'number')}
        />
        <TextField
          label="Street Name"
          id="street"
          error={false}
          errorMessage=""
          mountable={false}
          value={shippingDetails.street}
          onChange={(e) => handleOnChange(e, 'shipping', 'street')}
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
          onChange={(e) => handleOnChange(e, 'shipping', 'state')}
        />
        <TextField
          label="City"
          id="city"
          error={false}
          errorMessage=""
          mountable={false}
          value={shippingDetails.city}
          onChange={(e) => handleOnChange(e, 'shipping', 'city')}
        />
        <TextField
          label="Post Code"
          id="postCode"
          error={false}
          errorMessage=""
          mountable={false}
          value={shippingDetails.postCode}
          onChange={(e) => handleOnChange(e, 'shipping', 'postCode')}
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
          onChange={(e) => handleOnChange(e, 'shipping', 'country')}
        />
        <p>[SelectShippingMethod]</p>
      </div>
      <button type="button" onClick={handleNextButton}>Continue</button>
    </div>
  );
};

export default YourDetails;
