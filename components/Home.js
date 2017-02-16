import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { View } from 'react-native';
import UserMeetupListContainer from './UserMeetupListContainer';
import OpenMeetupListContainer from './OpenMeetupListContainer';

import {
  getLoggedInUserDataFromFB,
  setLoginStatus,
} from '../actions';

class Home extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('Login: Auth State Changed: ');
      if (user) {
        console.log('Set Login Status: logged In ');
        this.props.setLoginStatus(true);
        this.props.getLoggedInUserDataFromFB(user);
      } else {
        console.log('Set Login Status: logged out ');
        this.props.setLoginStatus(false);
      }
    });
  }
  render() {
    return (
      <View>
        <UserMeetupListContainer />
        <OpenMeetupListContainer />
      </View>
    );
  }
}


export default connect(null, {
  getLoggedInUserDataFromFB,
  setLoginStatus,
})(Home);
