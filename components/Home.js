import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { View } from 'react-native';
import UserMeetupListContainer from './MeetupLists/UserMeetupListContainer';
import OpenMeetupListContainer from './MeetupLists/OpenMeetupListContainer';

import {
  loadAuthenticatedUserState,
  setLoginStatus,
  userMeetupsFetch
} from '../actions';

class Home extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      // console.log('Login: Auth State Changed: ', user);
      this.props.loadAuthenticatedUserState(user);
      if (user) {
        // console.log('Set Login Status: logged In ');
        this.props.setLoginStatus(true);
        this.props.userMeetupsFetch();
      } else {
        // console.log('Set Login Status: logged out ');
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
  loadAuthenticatedUserState,
  setLoginStatus,
  userMeetupsFetch,
})(Home);
