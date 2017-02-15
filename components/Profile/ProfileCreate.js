import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, ScrollView, Text } from 'react-native';
import ProfileForm from './ProfileForm';
import {
  Button, Card, CardSection,
  Input, Spinner,
} from '../common';

import {
  createNewUserAccount,
  emailChanged,
  fetchGeoLocationByFullAddress,
  loginUser,
  passwordChanged,
  userInputChanged,
  userLocationInputChanged,
} from '../../actions';

class ProfileCreate extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onCreateAccountButtonPress() {
    const { firstName, lastName, image, email, password } = this.props;
    const { street, city, state, zipcode } = this.props.location;
    const userProfileData = { firstName, lastName, image, street, city, state, zipcode, email, password };
    this.props.createNewUserAccount(userProfileData);
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
        <ProfileForm />
        <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        <CardSection>
          {this.renderCreateAccountButton()}
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

const mapStateToProps = ({ auth, user }) => {
  const { email, password, error, loading } = auth;
  const { uid, firstName, lastName, image, meetups, location } = user;
  return {
    uid,
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
  createNewUserAccount,
  emailChanged,
  fetchGeoLocationByFullAddress,
  loginUser,
  passwordChanged,
  userInputChanged,
  userLocationInputChanged,
})(ProfileCreate);
