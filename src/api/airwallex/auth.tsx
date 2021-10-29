/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const login = () => axios
  .request({
    url: `${process.env.REACT_APP_BASE_URL}/auth/login`,
    method: 'post',
    headers: {
      'api-key': `${process.env.REACT_APP_API_KEY}`,
      'client-id': `${process.env.REACT_APP_CLIENT_ID}`,
    },
  });
