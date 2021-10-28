import axios from 'axios';

export const createPaymentIntent = (requestBody: any, token: any) => axios
  .request({
    url: 'http://localhost:4000/api/intent/create',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: requestBody,
  });
