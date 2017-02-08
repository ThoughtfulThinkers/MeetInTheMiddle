import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text } from 'react-native';
import { emailChanged, loginUser, passwordChanged } from '../actions';
import { Button, Card, CardSection, Input, Spinner } from './common';
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

  render() {
    return (
      <Card>
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
        </Card>
        <Card>
          <Text>Profile</Text>
          <CardSection>
            <Text>FirstName</Text>
          </CardSection>
        </Card>
      </Card>

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
  emailChanged,
  loginUser,
  passwordChanged
})(LoginForm);
