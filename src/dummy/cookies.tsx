import Cookies from 'universal-cookie';

// Dummy data from the customers shopping cart
const setDummyOrderCookie = () => {
  const cookies = new Cookies();
  cookies.set(
    'order',
    {
      amount: 310.00,
      currency: 'USD',
      order: {
        products: [
          {
            code: 'nike147',
            desc: 'Old school Nike dunks in blue',
            name: 'Nike Dunks Retro',
            quantity: 1,
            unit_price: 310.00,
          },
        ],
        shipping: {
          address: {
            city: '',
            country_code: 'CN',
            postcode: '',
            state: '',
            street: '',
            street_number: '',
          },
          first_name: '',
          last_name: '',
          phone_number: '',
          email_address: '',
          shipping_method: 'Overnight',
        },
      },
    },
    { path: '/' },
  );
};

// eslint-disable-next-line import/prefer-default-export
export { setDummyOrderCookie };
