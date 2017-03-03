import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { KeyboardAvoidingView, View, ScrollView, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ProfileForm from './ProfileForm';
import {
  Button, Card, CardSection,
  Input, Spinner,
} from '../common';

import * as actions from '../../actions';

class ProfileUpdate extends Component {
  state = {
    msg: '',
  }

  onUpdateProfileButtonPress() {
    let { firstName, lastName, image, email, password } = this.props;
    let { street, city, state, zipcode } = this.props.location;
    //TODO: error chcking
    firstName = firstName.trim();
    lastName = lastName.trim();
    image = image.trim();
    street = street.trim();
    city = city.trim();
    state = state.trim();
    zipcode = zipcode.trim();
    const data = { firstName, lastName, image, street, city, state, zipcode, email, password };
    if (firstName && lastName && street && city && state) {
      this.props.updateUser(data);
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

  renderUpdateProfileButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.onUpdateProfileButtonPress.bind(this)}>
        Update Profile
      </Button>
    );
  }

  render() {
    return (
      <KeyboardAwareScrollView ref='scroll'>
      <Card>
        <CardSection>
          <Text>Current email: {this.props.email}</Text>
        </CardSection>
        <CardSection>
          <Button onPress={() => Actions.manageEmail()} >
            Update Email Address
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={() => Actions.manageAuth()} >
            Update Password
          </Button>
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
            onFocus={(event: Event) => this._scrollToInput(ReactNative.findNodeHandle(event.target))}
            value={this.props.location.street}
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
        {this.renderUpdateProfileButton()}
        </CardSection>
      </Card>
      </KeyboardAwareScrollView>
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
  },
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

export default connect(mapStateToProps, actions)(ProfileUpdate);
