import axios from 'axios';
import { resolve } from './resolve.js';

export const createPaymentIntent = async (requestBody, bearerToken) => resolve(
  axios.request({
    url: 'https://api-demo.airwallex.com/api/v1/pa/payment_intents/create',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    data: requestBody,
  }),
);
