import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../src/contexts/AuthContext'
import SignedInRoute from '../src/PrivateRoutes/SignedInRoute'
import SignedOutRoute from '../src/PrivateRoutes/SignedOutRoute'
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import LoginComponent from './login/login';
import SignupComponent from './signup/signup';

require('firebase');
require('firebase/firestore');
require('firebase/auth');

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_API_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

firebase.analytics();

let routes = (
  <Router>
    <AuthProvider>
      <div id='evernote-container'>
        <Switch>
          <SignedInRoute exact path='/' component={App} />
          <SignedOutRoute exact path='/login' component={LoginComponent} />
          <SignedOutRoute exact path='/signup' component={SignupComponent} />
        </Switch>
      </div>
    </AuthProvider>
  </Router>
);

ReactDOM.render(routes,
  document.getElementById('evernote-container')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export const auth = app.auth()
export default app