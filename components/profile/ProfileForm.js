import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import {
  Button, Card, CardSection,
  Input, Spinner,
} from '../common';

import {
  emailChanged, loginUser, passwordChanged,
  userInputChanged, userLocationInputChanged,
} from '../../actions';

class ProfileForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onProfileButtonPress() {
    // const { email, password } = this.props;
    // this.props.loginUser({ email, password });
    console.log('onProfileButtonPress');
  }

  renderProfileButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.onProfileButtonPress.bind(this)}>
        Update Profile
      </Button>
    );
  }

  render() {
    return (
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

        <CardSection>
          <Input
            label="First Name"
            placeholder="William"
            value={this.props.firstName}
            onChangeText={value => this.props.userInputChanged({ prop: 'firstName', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Last Name"
            placeholder="Tell"
            value={this.props.lastName}
            onChangeText={value => this.props.userInputChanged({ prop: 'lastName', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Street"
            placeholder="123 Main St"
            value={this.props.location.street}
            onChangeText={
              value => this.props.userLocationInputChanged({ prop: 'location.street', value })
            }
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        <CardSection>
          {this.renderProfileButton()}
        </CardSection>
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

const mapStateToProps = ({ auth, user }) => {
  const { email, password, error, loading } = auth;
  const { firstName, lastName, image, meetups, location } = user;
  console.log('User Location: ', location.street);
  console.log('User First Name: ', location.firstName);
  return {
    email,
    password,
    error,
    loading,
    firstName,
    lastName,
    image,
    meetups,
    location,
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  loginUser,
  passwordChanged,
  userInputChanged,
  userLocationInputChanged,
})(ProfileForm);
