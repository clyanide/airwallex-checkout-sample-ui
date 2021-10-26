import React, { useEffect, useState } from 'react';
import {
  createElement,
  loadAirwallex,
  getElement,
  confirmPaymentIntent,
} from 'airwallex-payment-elements';

const intentId = 'replace-with-your-intent-id';
const clientSecret = 'replace-with-your-client-secret';

const PaymentDetailCard = () => {
  const [cardNumberReady, setCardNumberReady] = useState(false);
  const [cvcReady, setCvcReady] = useState(false);
  const [expiryReady, setExpiryReady] = useState(false);

  const [cardNumberComplete, setCardNumberComplete] = useState(true);
  const [cvcComplete, setCvcComplete] = useState(false);
  const [expiryComplete, setExpiryComplete] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [inputErrorMessage, setInputErrorMessage] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
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

    const onReady = (event:any) => {
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
        [type]: '', // Example: clear input error message
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
        setIsSubmitting(false); // Example: reset loading state
        window.alert(`Confirm success with ${JSON.stringify(response)}`);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setErrorMessage(error.message ?? JSON.stringify(error));
        console.error('There was an error', error);
      });
  };

  const allElementsReady = cardNumberReady && cvcReady && expiryReady;
  const allElementsComplete = cardNumberComplete && cvcComplete && expiryComplete;

  const inputStyle = {
    border: '1px solid',
    borderRadius: '5px',
    padding: '5px 10px',
    marginTop: '8px',
    height: '28px',
  };

  return (
    <div>
      <h2>Split Card element integration</h2>
      {/* Example: set loading state before elements are ready */}
      {!allElementsReady && <p>Loading...</p>}
      {/* Example below: display response message block */}
      {errorMessage.length > 0 && <p id="error">{errorMessage}</p>}
      {/* Styling example above: only displays block when all elements are ready */}
      <div style={{ display: allElementsReady ? 'block' : 'none' }}>
        {/* STEP #3a: Add empty containers for the card elements to be placed into */}
        <div className="field-container">
          <div className="field-label">Card number</div>
          <div
            id="cardNumber"
            style={inputStyle} // Example: input styling can be moved to css
          />
          <p style={{ color: 'red' }}>{inputErrorMessage.cardNumber}</p>
        </div>
        <div className="field-container">
          <div className="field-label">Expiry</div>
          <div
            id="expiry"
            style={inputStyle} // Example: input styling can be moved to css
          />
          <p style={{ color: 'red' }}>{inputErrorMessage.expiry}</p>
        </div>
        <div className="field-container">
          <div className="field-label">Cvc</div>
          <div
            id="cvc"
            style={inputStyle} // Example: input styling can be moved to css
          />
          <p style={{ color: 'red' }}>{inputErrorMessage.cvc}</p>
        </div>
        {/* STEP #3b: Add a submit button to trigger the payment request */}
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!allElementsComplete || isSubmitting} // Prevents invalid submissions
        >
          {isSubmitting ? 'Loading' : 'Confirm'}
        </button>
      </div>
    </div>
  );
};

export default PaymentDetailCard;
