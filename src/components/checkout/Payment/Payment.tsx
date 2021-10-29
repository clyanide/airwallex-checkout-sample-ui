import React, { useEffect, useState } from 'react';
import {
  createElement,
  loadAirwallex,
  getElement,
  confirmPaymentIntent,
} from 'airwallex-payment-elements';
import Cookies from 'universal-cookie';
import { PaymentMethodSelectCard } from '../../select';
import { PaymentConfirmButton, PaymentBackButton } from '../../buttons';
import styles from './Payment.module.scss';
import { login } from '../../../api/airwallex/auth';
import { createPaymentIntent } from '../../../api/airwallex/intent';
import { ReactComponent as ErrorIcon } from '../../../assets/svg/exclamation.svg';

interface IProps {
  setPaymentConfirmed: CallableFunction
}

const Payment = ({ setPaymentConfirmed }: IProps) => {
  const [cardNumberReady, setCardNumberReady] = useState(false);
  const [cvcReady, setCvcReady] = useState(false);
  const [expiryReady, setExpiryReady] = useState(false);
  const [paymentMethodsReady, setPaymentMethodsReady] = useState(false);

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

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

  const [intentId, setIntentId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [paymentMethods, setIntentPaymentMethods] = useState([]);

  useEffect(() => {
    try {
      login().then((loginRes) => createPaymentIntent(JSON.stringify(new Cookies().get('order')), loginRes.data.token)
        .then((intentRes) => {
          setIntentId(intentRes.data.id);
          setClientSecret(intentRes.data.client_secret);
          setIntentPaymentMethods(intentRes.data.available_payment_method_types);
          setPaymentMethodsReady(true);
          console.log(intentRes.data);
        }));
    } catch (err) {
      window.alert('There was a problem communicating with the server, please refresh');
      console.error(err);
    }
  }, []);

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
  }, [selectedPaymentMethod]);

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
    setErrorMessage('');
    setInputErrorMessage({
      ...inputErrorMessage, cardNumber: '', expiry: '', cvc: '',
    });
  };

  const handleBackButton = () => {
    setPaymentConfirmed();
    // window.alert('You cannot go back as it extends beyond the scope of this demo');
  };

  const allElementsReady = cardNumberReady && cvcReady && expiryReady && paymentMethodsReady;
  const allElementsComplete = cardNumberComplete && cvcComplete && expiryComplete;

  return (
    <div className={styles.body}>
      <p className={styles.heading}>Payment</p>
      {!allElementsReady && <p>Loading...</p>}
      <div className={!allElementsReady ? styles.hide : ''}>
        <div className={styles.methods}>
          {paymentMethods.map((method) => (
            <span key={method}>
              <PaymentMethodSelectCard
                paymentMethod={method}
                selected={method === selectedPaymentMethod}
                onClick={() => handlePaymentMethodSelect(method)}
              />

            </span>
          ))}
        </div>

        {selectedPaymentMethod === 'card' ? (
          <div className={styles.fields}>
            <div className={styles.row1}>
              <div className={styles.label}>Card Number</div>
              <div id="cardNumber" className={inputErrorMessage.cardNumber === '' || inputErrorMessage.cardNumber === undefined ? styles.input : styles.invalid} />
              <p>{inputErrorMessage.cardNumber !== '' ? inputErrorMessage.cardNumber : null}</p>
            </div>
            <div className={styles.row2}>
              <div className={styles.row2wrapper}>
                <div className={styles.label}>Expiration</div>
                <div id="expiry" className={inputErrorMessage.expiry === '' || inputErrorMessage.expiry === undefined ? styles.input : styles.invalid} />
                <p>{inputErrorMessage.expiry !== '' ? inputErrorMessage.expiry : null}</p>
              </div>
              <div className={styles.row2wrapper}>
                <div className={styles.label}>CVC</div>
                <div id="cvc" className={inputErrorMessage.cvc === '' || inputErrorMessage.cvc === undefined ? styles.input : styles.invalid} />
                <p>{inputErrorMessage.cvc !== '' ? inputErrorMessage.cvc : null}</p>
              </div>
            </div>
            <div className={styles.buttons}>
              <PaymentBackButton onClick={handleBackButton} />
              <PaymentConfirmButton
                onClick={handleConfirm}
                disabled={!allElementsComplete || isSubmitting}
                label={isSubmitting ? 'Loading' : 'Confirm payment'}
                total={isSubmitting ? '' : '$102.50'}
              />
            </div>
            <div className={errorMessage.length > 0 ? styles.error : styles.hide}>
              <div><ErrorIcon /></div>
              {errorMessage.length > 0 && <p id="error">{errorMessage}</p>}
            </div>
          </div>
        ) : (
          <p>Payment method not supported yet</p>
        )}
      </div>
    </div>
  );
};

export default Payment;
