import Exponent from 'exponent';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import reducers from './reducers';
import { fbConfig } from './envConfig';
import Router from './Router';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {
  componentWillMount() {
    firebase.initializeApp(fbConfig);

    firebase.auth().onAuthStateChanged(user => {
      // console.log('Auth State Changed: ', user);
      if (user) {
        console.log('Main.js user looged in');
      } else {
        console.log('Main.js user not logged in');
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

Exponent.registerRootComponent(App);
