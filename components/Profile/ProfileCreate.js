import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { KeyboardAvoidingView, View, ScrollView, Text } from 'react-native';
import ProfileForm from './ProfileForm';
import {
  Button, Card, CardSection,
  Input, Spinner,
} from '../common';

import {
  authError,
  createNewUserAccount,
  emailChanged,
  fetchGeoLocationByFullAddress,
  loginUser,
  passwordChanged,
  userInputChanged,
  userLocationInputChanged,
} from '../../actions';

class ProfileCreate extends Component {
  state = {
    msg: '',
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onCreateAccountButtonPress() {
    let { firstName, lastName, image, email, password } = this.props;
    let { street, city, state, zipcode } = this.props.location;
    email = email.trim();
    password = password.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    image = image.trim();
    street = street.trim();
    city = city.trim();
    state = state.trim();
    zipcode = zipcode.trim();
    const userProfileData = { firstName, lastName, image, street, city, state, zipcode, email, password };
    if (email && password && firstName && lastName && street && city && state) {
      this.props.createNewUserAccount(userProfileData);
    } else if (!email) {
      this.setState({ msg: 'Email Address is required ' });
    } else if (!password) {
      this.setState({ msg: 'Password is required ' });
    } else if (!firstName) {
      this.setState({ msg: 'First Name is required ' });
    } else if (!lastName) {
      this.setState({ msg: 'Last Name is required ' });
    } else if (!street) {
      this.setState({ msg: 'Street is required ' });
    } else if (!city) {
      this.setState({ msg: 'City is required ' });
    } else if (!state) {
      this.setState({ msg: 'state is required ' });
    }
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
      <KeyboardAvoidingView behavior='padding' style={styles.kbAvoidingViewStyle}>
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
        <CardSection>
          <Text style={styles.errorTextStyle} >{this.state.msg}</Text>
          <Text style={styles.errorTextStyle}>{this.props.authError}</Text>
        </CardSection>
        <CardSection>
          {this.renderCreateAccountButton()}
        </CardSection>
      </Card>
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  kbAvoidingViewStyle: {
    flex: 1,
  },
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
  authError,
  createNewUserAccount,
  emailChanged,
  fetchGeoLocationByFullAddress,
  loginUser,
  passwordChanged,
  userInputChanged,
  userLocationInputChanged,
})(ProfileCreate);
