import Exponent from 'exponent';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';

import reducers from './reducers';
import { fbConfig } from './envConfig';
import Router from './Router';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {

  componentWillMount() {
    firebase.initializeApp(fbConfig);
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
