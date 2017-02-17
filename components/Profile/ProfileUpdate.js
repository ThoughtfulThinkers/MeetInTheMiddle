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
  updateUser,
  emailChanged,
  fetchGeoLocationByFullAddress,
  loginUser,
  passwordChanged,
  userInputChanged,
  userLocationInputChanged,
} from '../../actions';

class ProfileUpdate extends Component {

  onUpdateProfileButtonPress() {
    const { firstName, lastName, image, email, password } = this.props;
    const { street, city, state, zipcode } = this.props.location;
    //TODO: error chcking
    // firstName = firstName.trim();
    // lastName = lastName.trim();
    // image = image.trim();
    // street = street.trim();
    // city = city.trim();
    // state = state.trim();
    // zipcode = zipcode.trim();
    // email = email.trim();
    // password = password.trim();
    const data = { firstName, lastName, image, street, city, state, zipcode, email, password };
    this.props.updateUser(data);
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
      <ScrollView>
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
        <ProfileForm />
        <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        <CardSection>
          {this.renderUpdateProfileButton()}
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

export default connect(mapStateToProps, {
  updateUser,
  emailChanged,
  fetchGeoLocationByFullAddress,
  loginUser,
  passwordChanged,
  userInputChanged,
  userLocationInputChanged,
})(ProfileUpdate);

// <CardSection>
//   <Input
//     label="First Name"
//     placeholder="William"
//     value={this.props.firstName}
//     onChangeText={value => this.props.userInputChanged({ prop: 'firstName', value })}
//   />
// </CardSection>
// <CardSection>
//   <Input
//     label="Last Name"
//     placeholder="Tell"
//     value={this.props.lastName}
//     onChangeText={value => this.props.userInputChanged({ prop: 'lastName', value })}
//   />
// </CardSection>
// <CardSection>
//   <Input
//     label="Street"
//     placeholder="123 Main St"
//     value={this.props.location.street}
//     onChangeText={
//       value => this.props.userLocationInputChanged({ prop: 'street', value })
//     }
//   />
// </CardSection>
// <CardSection>
//   <Input
//     label="City"
//     placeholder="Salt Lake city"
//     value={this.props.location.city}
//     onChangeText={
//       value => this.props.userLocationInputChanged({ prop: 'city', value })
//     }
//   />
// </CardSection>
// <CardSection>
//   <Input
//     label="State"
//     placeholder="UT"
//     value={this.props.location.state}
//     onChangeText={
//       value => this.props.userLocationInputChanged({ prop: 'state', value })
//     }
//   />
// </CardSection>
// <CardSection>
//   <Input
//     label="ZipCode"
//     placeholder="84111"
//     value={this.props.location.zipcode}
//     onChangeText={
//       value => this.props.userLocationInputChanged({ prop: 'zipcode', value })
//     }
//   />
// </CardSection>
