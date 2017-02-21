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
  state = {
    msg: '',
  }

  componentDidMount() {
    this.props.password = '';
  }

  onSubmitUpdate() {
    // console.log('onSubmitUpdate called');
    let { newEmail, password, } = this.props;
    newEmail = newEmail.trim();
    password = password.trim();
    if (newEmail && password) {
      this.props.updateUserEmail(newEmail, password);
    } else if (!newEmail) {
      this.setState({ msg: 'New Email is required' });
    } else if (!password) {
      this.setState({ msg: 'Password is required' });
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
            <Text style={styles.errorTextStyle} >{this.state.msg}</Text>
          </CardSection>
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
  },
  errorTextStyle: {
    color: 'red',
    fontSize: 20,
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10
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
