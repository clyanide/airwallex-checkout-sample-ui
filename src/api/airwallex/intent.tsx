/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const createPaymentIntent = (requestBody: string, token: string) => axios
  .request({
    url: `${process.env.REACT_APP_BASE_URL}/intent/create`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: requestBody,
  });
