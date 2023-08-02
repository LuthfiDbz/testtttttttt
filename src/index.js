import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Component/i18next/i18n'
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="408897613208-ibptk0obfhhjikv33ulf7ditdm46jqel.apps.googleusercontent.com">
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
);
