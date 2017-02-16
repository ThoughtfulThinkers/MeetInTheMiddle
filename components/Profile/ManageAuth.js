/**************************************************
  ManageAuth.js
  Used to manage a user's Email and password.
  To change either of these, they'll neet to
  authenticate with their current password
**************************************************/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Acttions } from 'react-native-router-flux';
import { View, ScrollView, Text } from 'react-native';
import {
  Button, Card, CardSection,
  Input, Spinner
} from '../common';

import {
  emailChanged,
  loginUser,
  passwordChanged,
  userInputChanged,
} from '../../actions';

class ManageAuth extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <Text>Hi from ManageAuth</Text>
        </CardSection>
      </Card>
    );
  }
}

export default connect(null, {
  emailChanged,
  loginUser,
  passwordChanged,
  userInputChanged,
})(ManageAuth);


/*****************************************************

onEmailChange(text) {
  this.props.emailChanged(text);
}

onPasswordChange(text) {
  this.props.passwordChanged(text);
}
<CardSection>
  <Input
    label="Email"
    placeholder="email@domain.com"
    onChangeText={this.onEmailChange.bind(this)}
    value={this.props.email}
  />
</CardSection>
<CardSection>
  <Input
  secureTextEntry
  label="Password"
  placeholder="reenter password"
  onChangeText={this.onPasswordChange.bind(this)}
  value={this.props.password}
  />
</CardSection>

*****************************************************/
