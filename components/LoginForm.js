import React, { Component } from 'react';
import firebase from 'firebase';
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
  setLoginStatus,
} from '../actions';
import MeetupList from './MeetupList';

class LoginForm extends Component {

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('Login: Auth State Changed: ');
      if (user) {
        console.log('Set Login Status: logged In ');
        this.props.setLoginStatus(true);
      } else {
        console.log('Set Login Status: logged out ');
        this.props.setLoginStatus(false);
      }
    });
  }

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

  onCreateAccountButtonPress(email, password) {
    // const { email, password } = this.props;
    this.props.createNewUserAccount({ email, password });
  }

  renderButtons() {
    // const isLoggedIn = this.props.loggedIn;
    const { email, password, error, loading, loggedIn } = this.props;
    if (loading) {
      return <Spinner size="large" />;
    }
    if (loggedIn) {
      return (
        <Card>
          <CardSection>
            <Text style={styles.title}>Logged In</Text>
          </CardSection>
          <CardSection>
            <Button onPress={() => Actions.profileUpdate({ email, password })}>
              Update Profile
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.onLogoutButtonPress.bind(this)}>
              Log Out
            </Button>
          </CardSection>
        </Card>
        );
      } else {
        // loggedOut
        return (
          <Card>
            <CardSection>
              <Text style={styles.title}>Please Login or Sign Up</Text>
            </CardSection>
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
            <CardSection>
              <Button onPress={this.onLoginButtonPress.bind(this)}>
                Login
              </Button>
            </CardSection>
            <CardSection>
              <Button onPress={() => Actions.profileCreate({ type: 'reset' })} >
                Sign Up
              </Button>
            </CardSection>
          </Card>
        );
      }
    }

  render() {
    return (
      <ScrollView>
        <Card>
          {this.renderButtons()}
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
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
  },
  title: {
    flex: 1,
    color: '#4E0FA1',
    fontSize: 20,
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, loggedIn } = auth;
  // console.log('LoginForm props loggedIn', loggedIn)
  return { email, password, error, loading, loggedIn };
};

export default connect(mapStateToProps, {
  createNewUserAccount,
  emailChanged,
  loginUser,
  logoutUser,
  passwordChanged,
  setLoginStatus,
})(LoginForm);
