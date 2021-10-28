import axios from 'axios';

export const login = () => axios
  .request({
    url: 'http://localhost:4000/api/auth/login',
    method: 'post',
    headers: {
      'api-key': 'f2007481a3d7cc5a92c7081ec3b890ab75a96784e5b58cd242bffab9183b42cd95b6dbd6d17c0fc0c516fda6ea3514b9',
      'client-id': 'O3XnkjaSSg2aJ5N_WBrpgw',
    },
  });
