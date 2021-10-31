# Airwallex Checkout Sample UI
This project is a sample ecommerce checkout for the company ShoesForYou. It utilises the Airwallex Payment Gateway, and preserves control over UI via Airwallex's Embedded Field Integration.

## Technologies
- React (with `create-react-app`)
- Typescript
- SASS/SCSS
- Hooks
- ESLint
- Airwallex Embedded Fields Integration

## Getting Started

### Prerequisites
- NodeJS
- NPM

### Development Mode
1. Start the Node.js API server (see instructions [here](https://github.com/clyanide/airwallex-checkout-express-server)). 
2. Clone this repo and navigate to the root directory
3. Create a `.env` file in the root directory of the project
4. In the `.env` file, add the following variables 
    - `PORT` (optional, specifies the port number the app will run on locally)
    - `REACT_APP_API_KEY` (Airwallex API Key)
    - `REACT_APP_CLIENT_ID` (Airwallex client ID)
    - `REACT_APP_BASE_URL` (API base URL - e.g. `localhost:4000/api`)
5. `npm install` to install all the required dependencies
6. `npm start` to start the local server

### Production Build
1. Follow steps 1-5 in 'Development Mode' above
2. `npm run build` to generate deployment files
3. `serve -s build -l <port number>` to run the production build

## Project Structure
### Top-level Directories
- `api/` - Axios functions calling out to our API
- `assets/` - Icons, images, and logos
- `components/` - React components structured according to the [Atomic Design Pattern](https://medium.com/@janelle.wg/atomic-design-pattern-how-to-structure-your-react-application-2bb4d9ca5f97)
- `dummy/` - Source of all dummy data/functions used in this project
- `pages/` - Top level page components

### Styling
SCSS module files are stored in the same level as the component that is using it.
- /BackButton
    - BackButton.tsx
    - BackButton.module.scss

### Linting
This project's linting is configured to follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

### Indexes
Each component-type directory (e.g. `buttons`) contains an `index.tsx` file to centralise import/export of a particular component type to a single path. For example, you can import `BackButton` and `ConfirmButton` from the path `./buttons`, instead of specifying both paths `./BackButton` and `./ConfirmButton`

## Functionality & Scope

### General Functionality
This application simulates the customer's experience in the following tasks of the online shopping process
- Entering personal information and shipping address (persisted in encrypted browser cookies)
- Selecting a payment method and entering payment details ([Airwallex Split-Card Embedded Fields Integration](https://www.airwallex.com/docs/online-payments__embedded-fields-integration))
    - At this stage, only the processing of card payments is implemented
- Completing the payment

### Project Scope
The project scope is isolated to the customer checkout process, starting at entering personal/shipping information, and ending at payment confirmation
- Tasks performed prior to checkout (e.g. adding items to cart) are represented with dummy data
- Instead of redirecting to a 'home' page after payment confirmation, we instead redirect the workflow back to the start of the scope (start of the checkout process)

### Dummy Data
The following is a list of dummy data and why it was used
1. Shopping cart - out of scope (see 'Project Scope' above)
2. Country code - requires call-out to a country code dictionary (either custom built or outsourced) and deemed out of scope due to time constraints
3. Shipping method - Specific to the merchant and their preferences

## Changes For Production
- When using the `loadAirwallex` function in the [airwallex-payment-elements](https://www.npmjs.com/package/airwallex-payment-elements) package, we need to specify `env` to be production instead of development 
- Change website icon (currently React logo) to company logo icon
- Integrate with real data instead of dummy data
- Stricter format validation of customer information input (e.g. address, phone number, .etc)
-  Store the Airwallex Client ID and API key in backend API server instead of in the `.env` of our frontend application
    - Airwallex currently doesn't offer sub-users/roles so there is only one copy of the Client ID and API Key, so if the keys were to change, we would need to update all frontend projects that is using it
    - Should only be done after securing the backend API (e.g. Auth0 with Passport.js)
- Create a comprehensive test suite (e.g. [Jest](https://jestjs.io/))

Production changes required for the backend API can be found [here](https://github.com/clyanide/airwallex-checkout-express-server#changes-for-production).
