import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, ScrollView, Text } from 'react-native';
import {
  Button, Card, CardSection,
  Input, Spinner,
} from '../common';

import ProfileCreate from './ProfileCreate';
import ProfileUpdate from './ProfileUpdate';
// import ProfileForm from './ProfileForm';

class Profile extends Component {

  renderForm() {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      Actions.ProfileUpdate();
      return;
    } else {
      Actions.ProfileCreate();
      return;
    }
  }
  render() {
    return (
      <View>
        {this.renderForm().bind(this)}
      </View>
    );
  }
}
