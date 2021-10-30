# Airwallex Checkout Sample UI
This project is a sample ecommerce checkout for the company ShoesForYou. It utilises the Airwallex Payment Gateway, and preserves control over UI via Airwallex's Embedded Field Integration.

## Technologies
- React (with `create-react-app`)
- SASS/SCSS
- Hooks

## Prerequisites
- NodeJS
- NPM

## Getting Started
1. Start the Node.js backend server (see instructions here)
2. Create a `.env` file in the root directory of the project
3. In the `.env` files, add the following variables 
    - `PORT` (optional, specifies the port number the app will run on locally)
    - `REACT_APP_API_KEY` (Airwallex API Key)
    - `REACT_APP_CLIENT_ID` (Airwallex client ID)
4. `npm install` to install all the required dependencies
5. `npm start` to start the local server