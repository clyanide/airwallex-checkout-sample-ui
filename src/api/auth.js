import axios from 'axios';
import { resolve } from './resolve.js';

export const getAuthToken = async (apiKey, clientId) => resolve(
  axios.request({
    url: 'https://api-demo.airwallex.com/api/v1/authentication/login',
    method: 'post',
    headers: { 'Content-Type': 'application/json', 'x-client-id': clientId, 'x-api-key': apiKey },
  }),
);
