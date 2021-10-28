import React, { useEffect } from 'react';
import axios from 'axios';
import { Payment, BasketSummary } from '../../components/checkout';
import { getAuthToken } from '../../api/auth.js';

const Checkout = () => <BasketSummary />;

export default Checkout;
