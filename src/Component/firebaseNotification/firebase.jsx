import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {

  apiKey: "AIzaSyAnUxChichvkUKKzLaCbZe2lmv77TJ041o",

  authDomain: "superkul-v2.firebaseapp.com",

  projectId: "superkul-v2",

  storageBucket: "superkul-v2.appspot.com",

  messagingSenderId: "408897613208",

  appId: "1:408897613208:web:a6701106c4d54af7130fed",

  measurementId: "G-VH3NB2531H"

};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

const url_auth = process.env.REACT_APP_DEV_URL
const access_token = localStorage.getItem('ACCESS_TOKEN')
const headers = {
  'Authorization': `Bearer ${access_token}`
}


export const fetchToken = (setTokenFound) => {
  return getToken(messaging, { vapidKey: 'BJ-oOAam2awkHIco1EyAkL_707b1G7R5CnmF4HmHLcKkNZjBJRPSWYBfNxk-1gaO8u61_zdwBo6n0marDXYVstk' }).then(async (currentToken) => {
    if (currentToken) {
      // console.log(currentToken)
      setTokenFound(currentToken);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });