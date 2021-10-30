import React, { ChangeEvent, useState } from 'react';
import Cookies from 'universal-cookie';
import styles from './YourDetails.module.scss';
import { TextField } from '../../inputs';
import { ContinueButton } from '../../buttons';

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

  const inputIsValid = (value: string, field: string) => {
    let errorMessage = '';
    switch (field) {
      case 'firstName':
        // Accept any string
        break;
      case 'lastName':
        // Accept any string
        break;
      case 'phone':
        // Accept numbers
        if (!/^\d+$/.test(value)) {
          errorMessage = 'Please enter a valid phone number';
        }
        break;
      case 'email':
        // Accept valid email format
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
          errorMessage = 'Please enter a valid email address';
        }
        break;
      case 'number':
        // Accept alphanumerics and slash
        if (!/^[A-Za-z0-9/]+$/.test(value)) {
          errorMessage = 'Please enter a valid street number';
        }
        break;
      case 'street':
        // Accept letters and spaces
        if (!/^[A-Za-z\s]+$/.test(value)) {
          errorMessage = 'Please enter a valid street name';
        }
        break;
      case 'state':
        // Accept letters and spaces
        if (!/^[A-Za-z\s]+$/.test(value)) {
          errorMessage = 'Please enter a valid state';
        }
        break;
      case 'city':
        // Accept letters and spaces
        if (!/^[A-Za-z\s]+$/.test(value)) {
          errorMessage = 'Please enter a valid city';
        }
        break;
      case 'postCode':
        // Accept numbers
        if (!/^\d+$/.test(value)) {
          errorMessage = 'Please enter a valid post code';
        }
        break;
      case 'country':
        // Accept letters and spaces
        if (!/^[A-Za-z\s]+$/.test(value)) {
          errorMessage = 'Please enter a valid country';
        }
        break;
      default:
        break;
    }

    return errorMessage;
  };

  const handleOnChange = (e : ChangeEvent<HTMLInputElement>, type: string, field: string) => {
    if (type === 'customer') {
      setCustomerDetails({ ...customerDetails, [field]: e.target.value });
    } else if (type === 'shipping') {
      setShippingDetails({ ...shippingDetails, [field]: e.target.value });
    }

    if (e.target.value !== '' && inputIsValid(e.target.value, field) === '') {
      setInputComplete({ ...inputComplete, [field]: true });
    } else { setInputComplete({ ...inputComplete, [field]: false }); }
  };

  const handleOnBlur = (e : ChangeEvent<HTMLInputElement>, field: string) => {
    const errorMessage = inputIsValid(e.target.value, field);
    if (e.target.value !== '' && errorMessage !== '') {
      setInputErrorMessage({ ...inputErrorMessage, [field]: errorMessage });
      setInputComplete({ ...inputComplete, [field]: false });
    } else {
      setInputErrorMessage({ ...inputErrorMessage, [field]: '' });
      setInputComplete({ ...inputComplete, [field]: true });
    }
  };

  return (
    <div className={styles.body}>
      <p className={styles.heading}>Your Details</p>
      <div className={styles.fields}>
        <div className={styles.row}>
          <div className={styles.row1}>
            <TextField
              label="First Name"
              id="firstName"
              error={inputErrorMessage.firstName !== ''}
              errorMessage={inputErrorMessage.firstName}
              mountable={false}
              value={customerDetails.firstName}
              onChange={(e) => handleOnChange(e, 'customer', 'firstName')}
              onBlur={(e) => handleOnBlur(e, 'firstName')}
            />
          </div>
          <div className={styles.row1}>
            <TextField
              label="Last Name"
              id="lastName"
              error={inputErrorMessage.lastName !== ''}
              errorMessage={inputErrorMessage.lastName}
              mountable={false}
              value={customerDetails.lastName}
              onChange={(e) => handleOnChange(e, 'customer', 'lastName')}
              onBlur={(e) => handleOnBlur(e, 'lastName')}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.row2}>
            <TextField
              label="Phone Number"
              id="phone"
              error={inputErrorMessage.phone !== ''}
              errorMessage={inputErrorMessage.phone}
              mountable={false}
              value={customerDetails.phone}
              onChange={(e) => handleOnChange(e, 'customer', 'phone')}
              onBlur={(e) => handleOnBlur(e, 'phone')}
            />

          </div>
          <div className={styles.row2}>
            <TextField
              label="Email Address"
              id="email"
              error={inputErrorMessage.email !== ''}
              errorMessage={inputErrorMessage.email}
              mountable={false}
              value={customerDetails.email}
              onChange={(e) => handleOnChange(e, 'customer', 'email')}
              onBlur={(e) => handleOnBlur(e, 'email')}
            />
          </div>
        </div>
        <p className={styles.subheading}>Shipping Information</p>
        <div className={styles.row}>
          <div className={styles.row3}>
            <TextField
              label="Street Number"
              id="number"
              error={inputErrorMessage.number !== ''}
              errorMessage={inputErrorMessage.number}
              mountable={false}
              value={shippingDetails.number}
              onChange={(e) => handleOnChange(e, 'shipping', 'number')}
              onBlur={(e) => handleOnBlur(e, 'number')}
            />
          </div>
          <div className={styles.row3}>
            <TextField
              label="Street Name"
              id="street"
              error={inputErrorMessage.street !== ''}
              errorMessage={inputErrorMessage.street}
              mountable={false}
              value={shippingDetails.street}
              onChange={(e) => handleOnChange(e, 'shipping', 'street')}
              onBlur={(e) => handleOnBlur(e, 'street')}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.row4}>
            <TextField
              label="State"
              id="state"
              error={inputErrorMessage.state !== ''}
              errorMessage={inputErrorMessage.state}
              mountable={false}
              value={shippingDetails.state}
              onChange={(e) => handleOnChange(e, 'shipping', 'state')}
              onBlur={(e) => handleOnBlur(e, 'state')}
            />
          </div>

          <div className={styles.row4}>
            <TextField
              label="Post Code"
              id="postCode"
              error={inputErrorMessage.postCode !== ''}
              errorMessage={inputErrorMessage.postCode}
              mountable={false}
              value={shippingDetails.postCode}
              onChange={(e) => handleOnChange(e, 'shipping', 'postCode')}
              onBlur={(e) => handleOnBlur(e, 'postCode')}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.row5}>
            <TextField
              label="City"
              id="city"
              error={inputErrorMessage.city !== ''}
              errorMessage={inputErrorMessage.city}
              mountable={false}
              value={shippingDetails.city}
              onChange={(e) => handleOnChange(e, 'shipping', 'city')}
              onBlur={(e) => handleOnBlur(e, 'city')}
            />
          </div>
          <div className={styles.row5}>
            <TextField
              label="Country"
              id="country"
              error={inputErrorMessage.country !== ''}
              errorMessage={inputErrorMessage.country}
              mountable={false}
              value={shippingDetails.country}
              onChange={(e) => handleOnChange(e, 'shipping', 'country')}
              onBlur={(e) => handleOnBlur(e, 'country')}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <ContinueButton onClick={handleNextButton} label="Continue" disabled={!allElementsComplete} />
        </div>
      </div>
    </div>
  );
};

export default YourDetails;
