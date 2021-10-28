import React, { useEffect, useState } from 'react';
import {
  createElement,
  loadAirwallex,
  getElement,
  confirmPaymentIntent,
} from 'airwallex-payment-elements';
import { PaymentMethodSelectCard } from '../../select';
import { PaymentConfirmButton, PaymentBackButton } from '../../buttons';
import styles from './Payment.module.scss';
import { login } from '../../../api/airwallex/auth';
import { createPaymentIntent } from '../../../api/airwallex/intent';

// Dummy request body, TODO: use order
const requestBody = JSON.stringify({ amount: 100, currency: 'USD' });

const Payment = ({ setPaymentConfirmed, order }: any) => {
  const [cardNumberReady, setCardNumberReady] = useState(false);
  const [cvcReady, setCvcReady] = useState(false);
  const [expiryReady, setExpiryReady] = useState(false);

  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [cvcComplete, setCvcComplete] = useState(false);
  const [expiryComplete, setExpiryComplete] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [inputErrorMessage, setInputErrorMessage] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Card');

  const [intentId, setIntentId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  useEffect(() => {
    try {
      login().then((loginRes) => createPaymentIntent(requestBody, loginRes.data.token)
        .then((intentRes) => {
          setIntentId(intentRes.data.id);
          setClientSecret(intentRes.data.client_secret);
        }));
    } catch (err) {
      window.alert('There was a problem communicating with the server, please refresh');
      console.error(err);
    }
  });

  useEffect(() => {
    loadAirwallex({
      env: 'demo',
      origin: window.location.origin,
      fonts: [
        {
          src: 'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
          family: 'AxLLCircular',
          weight: 400,
        },
      ],
    }).then(() => {
      const cardNumEle = createElement('cardNumber');
      const cvcEle = createElement('cvc');
      const expiryEle = createElement('expiry');

      cardNumEle?.mount('cardNumber');
      cvcEle?.mount('cvc');
      expiryEle?.mount('expiry');
    });

    const onReady = (event: any) => {
      const { type } = event.detail;
      if (type === 'cardNumber') {
        setCardNumberReady(true);
      }
      if (type === 'cvc') {
        setCvcReady(true);
      }
      if (type === 'expiry') {
        setExpiryReady(true);
      }
    };

    const onChange = (event: any) => {
      const { type, complete } = event.detail;
      if (type === 'cardNumber') {
        setCardNumberComplete(complete);
      }
      if (type === 'cvc') {
        setCvcComplete(complete);
      }
      if (type === 'expiry') {
        setExpiryComplete(complete);
      }
    };

    const onFocus = (event: any) => {
      const { type } = event.detail;
      setInputErrorMessage({
        ...inputErrorMessage,
        [type]: '',
      });
    };

    const onBlur = (event: any) => {
      const { type, error } = event.detail;
      setInputErrorMessage({
        ...inputErrorMessage,
        [type]: error?.message ?? JSON.stringify(error),
      });
    };

    window.addEventListener('onReady', onReady);
    window.addEventListener('onChange', onChange);
    window.addEventListener('onBlur', onBlur);
    window.addEventListener('onFocus', onFocus);

    return () => {
      window.removeEventListener('onReady', onReady);
      window.removeEventListener('onChange', onChange);
      window.removeEventListener('onBlur', onBlur);
      window.removeEventListener('onFocus', onFocus);
    };
  }, []);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setErrorMessage('');
    const cardNumElement = getElement('cardNumber');
    confirmPaymentIntent({
      element: cardNumElement!,
      id: intentId,
      client_secret: clientSecret,
      payment_method_options: {
        card: {
          auto_capture: true,
        },
      },
    })
      .then((response) => {
        setIsSubmitting(false);
        window.alert(`Confirm success with ${JSON.stringify(response)}`);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setErrorMessage(error.message ?? JSON.stringify(error));
        console.error('There was an error', error);
      });
  };

  const handlePaymentMethodSelect = (method: any) => {
    setSelectedPaymentMethod(method);
  };

  const handleBackButton = () => {
    setPaymentConfirmed(true);
    // window.alert('You cannot go back as it extends beyond the scope of this demo');
  };

  const allElementsReady = cardNumberReady && cvcReady && expiryReady;
  const allElementsComplete = cardNumberComplete && cvcComplete && expiryComplete;

  // Dummy data, would be retrieved from database and determined by merchant
  const paymentMethods = ['Card', 'Paypal', 'Wechat'];

  return (
    <div className={styles.body}>
      <p className={styles.heading}>Payment</p>
      <div className={styles.methods}>
        {paymentMethods.map((method) => (
          <span>
            <PaymentMethodSelectCard
              key={method}
              paymentMethod={method}
              selected={method === selectedPaymentMethod}
              onClick={() => handlePaymentMethodSelect(method)}
            />

          </span>
        ))}
      </div>

      {!allElementsReady && <p>Loading...</p>}

      {errorMessage.length > 0 && <p id="error">{errorMessage}</p>}

      {selectedPaymentMethod === 'Card' ? (
        <div style={{ display: allElementsReady ? 'block' : 'none' }}>
          <div>
            <div>Card number</div>
            <div id="cardNumber" className={styles.input} />
            <p>{inputErrorMessage.cardNumber}</p>
          </div>
          <div>
            <div>
              <div>Expiry</div>
              <div id="expiry" className={styles.input} />
              <p>{inputErrorMessage.expiry}</p>
            </div>
            <div>
              <div>Cvc</div>
              <div id="cvc" className={styles.input} />
              <p>{inputErrorMessage.cvc}</p>
            </div>
          </div>
          <div>
            <PaymentBackButton onClick={handleBackButton} />
            <PaymentConfirmButton
              onClick={handleConfirm}
              disabled={!allElementsComplete || isSubmitting}
              label={isSubmitting ? 'Loading' : 'Confirm payment'}
              total="$102.50"
            />
          </div>
        </div>
      ) : (
        <p>Payment method not supported yet</p>
      )}
    </div>
  );
};

export default Payment;
