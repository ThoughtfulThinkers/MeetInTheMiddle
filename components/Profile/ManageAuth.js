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

class ManageAuth extends Component {

  onSubmitUpdate() {
    const { email, password, newPassword, confirmPassword } = this.props;
    if (!password) return;
    if (newPassword && newPassword === confirmPassword) {
      this.props.updateUserPassword(newPassword, password);
    }
    if (newEmail) {
      this.props.updateUserEmail(newEmail, password);
    }
  }

  render() {
    return (
      <Card>
        <Card>
          <CardSection>
            <Text>Enter Your New Email</Text>
          </CardSection>
          <CardSection>
            <Input
              label="New Email"
              placeholder="email@domain.com"
              value={this.props.newEmail}
              onChangeText={value => this.props.authInputChanged({ prop: 'newEmail', value })}
            />
          </CardSection>
          </Card>
          <Card>
            <CardSection>
              <Text>Change Your Password</Text>
            </CardSection>
            <CardSection>
              <Input
                secureTextEntry
                label="New Password"
                placeholder="new password"
                value={this.props.newPassword}
                onChangeText={value => this.props.authInputChanged({ prop: 'newPassword', value })}
              />
            </CardSection>
            <CardSection>
              <Input
                secureTextEntry
                label="Confim Password"
                placeholder="new password"
                value={this.props.newPassword}
                onChangeText={value => this.props.authInputChanged({ prop: 'confirmPassword', value })}
              />
            </CardSection>
          </Card>
        <Card>
          <CardSection>
            <Text style={styles.noticeStyle}>
              Current Password Required To Update Your Email or Password
            </Text>
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
          <Card>
            <CardSection>
              <Button>Update</Button>
            </CardSection>
          </Card>
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
  const { email, newEmail, password, newPassword, confirmPassword, } = auth;
  return { email, newEmail, password, newPassword, confirmPassword, };
};

export default connect(null, {
  authInputChanged,
  emailChanged,
  loginUser,
  passwordChanged,
  updateUserEmail,
  updateUserPassword,
  userInputChanged,
})(ManageAuth);


ManageAuth.propTypes = {
  email: React.PropTypes.string,
  password: React.PropTypes.string,
};
