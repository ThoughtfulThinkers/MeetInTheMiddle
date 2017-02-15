import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ScrollView, Text, View } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import {
  createNewUserAccount,
  emailChanged,
  loginUser,
  logoutUser,
  passwordChanged,
} from '../actions';
import MeetupList from './MeetupList';

class LoginForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  onLogoutButtonPress() {
    this.props.logoutUser();
  }

  onCreateAccountButtonPress() {
    const { email, password } = this.props;
    this.props.createNewUserAccount({ email, password });
  }

  renderLoginButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.onLoginButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  renderUpdateProfileButton() {
    const { email, password } = this.props;
    return (
      <Button onPress={() => Actions.profileUpdate({ email, password })}>
        Update Profile
      </Button>
    );
  }

  renderLogoutButton() {
    return (
      <Button onPress={this.onLogoutButtonPress.bind(this)}>
        Log Out
      </Button>
    );
  }

  renderCreateAccountButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
        <Button onPress={this.onCreateAccountButtonPress.bind(this)}>
          Create New Account
        </Button>
    );
  }

  render() {
    return (
      <ScrollView>
        <Card>
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
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
            />
          </CardSection>

          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
          <CardSection>
            {this.renderLoginButton()}
          </CardSection>
          <CardSection>
            {this.renderUpdateProfileButton()}
          </CardSection>
          <CardSection>
            {this.renderLogoutButton()}
          </CardSection>
          <CardSection>
            <Button onPress={() => Actions.profileCreate({ type: 'reset' })} >Sign Up</Button>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  errorTextStyle: {
    color: 'red',
    fontSize: 20,
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  createNewUserAccount,
  emailChanged,
  loginUser,
  logoutUser,
  passwordChanged
})(LoginForm);
