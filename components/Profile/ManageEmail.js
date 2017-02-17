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
  authInputChanged,
  emailChanged,
  loginUser,
  passwordChanged,
  updateUserEmail,
  updateUserPassword,
  userInputChanged,
} from '../../actions';

class ManageEmail extends Component {

  onSubmitUpdate() {
    console.log('onSubmitUpdate called');
    const { newEmail, password, } = this.props;
    if (!password) return;
    if (newEmail) {
      this.props.updateUserEmail(newEmail, password);
    }
  }

  render() {
    return (
      <Card>
        <Card>
          <CardSection>
            <Text>Current Email {this.props.email}</Text>
          </CardSection>
          <CardSection>
            <Input
              label="New Email"
              placeholder="email@domain.com"
              value={this.props.newEmail}
              onChangeText={value => this.props.authInputChanged({ prop: 'newEmail', value })}
            />
          </CardSection>
          <CardSection>
            <Input
            secureTextEntry
            label="Password"
            placeholder="current password"
            value={this.props.password}
            onChangeText={value => this.props.authInputChanged({ prop: 'password', value })}
            />
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Button onPress={this.onSubmitUpdate.bind(this)}>Update</Button>
          </CardSection>
        </Card>
      </Card>
    );
  }
}

const styles = {
  noticeStyle: {
    fontSize: 15,
  }
};

const mapStatetoProps = ({ auth }) => {
  const { email, newEmail, password, } = auth;
  return { email, newEmail, password, };
};

export default connect(mapStatetoProps, {
  authInputChanged,
  emailChanged,
  loginUser,
  passwordChanged,
  updateUserEmail,
  updateUserPassword,
  userInputChanged,
})(ManageEmail);
