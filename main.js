import Exponent from 'exponent';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Router from './Router';

class App extends Component {
  render() {
    return (
      <Router />
    );
  }
}

Exponent.registerRootComponent(App);
