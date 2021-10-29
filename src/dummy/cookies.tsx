import Cookies from 'universal-cookie';

const setDummyOrderCookie = () => {
  const cookies = new Cookies();
  cookies.set(
    'order',
    {
      amount: 310.0,
      currency: 'USD',
      order: {
        products: [
          {
            code: 'nike147',
            desc: 'Old school Nike dunks in blue',
            name: 'Nike Dunks Retro',
            quantity: 1,
            unit_price: 310.0,
          },
        ],
        shipping: {
          address: {
            city: 'Shanghai',
            country_code: 'CN',
            postcode: '10000',
            state: 'Shanghai',
            street: 'East Street',
            street_number: '20A',
          },
          first_name: 'John',
          last_name: 'Smith',
          phone_number: '02109834710',
          email_address: 'john.doe@gmail.com',
          shipping_method: 'Overnight',
        },
      },
    },
    { path: '/' },
  );
};

// eslint-disable-next-line import/prefer-default-export
export { setDummyOrderCookie };
