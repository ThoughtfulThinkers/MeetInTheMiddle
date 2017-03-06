import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { KeyboardAvoidingView, View, ScrollView, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ProfileForm from './ProfileForm';
import { styles } from '../../assets/Styles';
import {
  Button, Card, CardSection,
  Input, Spinner,
} from '../common';

import * as actions from '../../actions';

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

  _scrollToInput(reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.refs.scroll.scrollToFocusedInput(reactNode);
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
      <KeyboardAwareScrollView ref='scroll'>
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@domain.com"
            onFocus={(event: Event) => this._scrollToInput(ReactNative.findNodeHandle(event.target))}
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>
        <CardSection>
          <Input
          secureTextEntry
          label="Password"
          onFocus={(event: Event) => this._scrollToInput(ReactNative.findNodeHandle(event.target))}
          placeholder="password"
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
          />
        </CardSection>
        <CardSection>
          <Input
            label="First Name"
            placeholder="William"
            onFocus={(event: Event) => this._scrollToInput(ReactNative.findNodeHandle(event.target))}
            value={this.props.firstName}
            onChangeText={value => this.props.userInputChanged({ prop: 'firstName', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Last Name"
            placeholder="Tell"
            onFocus={(event: Event) => this._scrollToInput(ReactNative.findNodeHandle(event.target))}
            value={this.props.lastName}
            onChangeText={value => this.props.userInputChanged({ prop: 'lastName', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Street"
            placeholder="123 Main St"
            value={this.props.location.street}
            onFocus={(event: Event) => this._scrollToInput(ReactNative.findNodeHandle(event.target))}
            onChangeText={
              value => this.props.userLocationInputChanged({ prop: 'street', value })
            }
          />
        </CardSection>
        <CardSection>
          <Input
            label="City"
            placeholder="Salt Lake City"
            onFocus={(event: Event) => this._scrollToInput(ReactNative.findNodeHandle(event.target))}
            value={this.props.location.city}
            onChangeText={
              value => this.props.userLocationInputChanged({ prop: 'city', value })
            }
          />
        </CardSection>
        <CardSection>
          <Input
            label="State"
            placeholder="UT"
            onFocus={(event: Event) => this._scrollToInput(ReactNative.findNodeHandle(event.target))}
            value={this.props.location.state}
            onChangeText={
              value => this.props.userLocationInputChanged({ prop: 'state', value })
            }
          />
        </CardSection>
        <CardSection>
          <Input
            label="ZipCode"
            placeholder="84111"
            onFocus={(event: Event) => this._scrollToInput(ReactNative.findNodeHandle(event.target))}
            value={this.props.location.zipcode}
            onChangeText={
              value => this.props.userLocationInputChanged({ prop: 'zipcode', value })
            }
          />
        </CardSection>
        <CardSection>
          <Text style={styles.errorTextStyle} >{this.state.msg}</Text>
          <Text style={styles.errorTextStyle}>{this.props.authError}</Text>
        </CardSection>
        <CardSection>
          {this.renderCreateAccountButton()}
        </CardSection>
      </Card>
      </KeyboardAwareScrollView>
    );
  }
}

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

export default connect(mapStateToProps, actions)(ProfileCreate);
