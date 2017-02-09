import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createUser,
  emailChanged,
  fetchGeoLocationByFullAddress,
  loginUser,
  passwordChanged,
  userInputChanged,
  userLocationInputChanged,
} from '../../actions';
import { Button, Card, CardSection, } from '../common';
import ProfileForm from './ProfileForm';

class ProfileEdit extends Component {

  renderUpdateProfileButton() {
    if (this.props.loading) {
      console.log('something');
    }
  }
  render() {
    return (
      <Card>
        <ProfileForm {...this.props} />
        <CardSection>
          <Button >
            Update Profile
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = ({ auth, user }) => {
  const { email, password, error, loading } = auth;
  const { uid, firstName, lastName, image, meetups, location } = user;
  console.log('User Location: ', location.street);
  console.log('User First Name: ', location.firstName);
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
  };
};

export default connect(mapStateToProps, {
  createUser,
  emailChanged,
  fetchGeoLocationByFullAddress,
  loginUser,
  passwordChanged,
  userInputChanged,
  userLocationInputChanged,
})(ProfileEdit);
