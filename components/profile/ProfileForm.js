// ProfileForm.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
} from 'react-native';
import {
  Card,
  CardSection,
  Input,
} from '../common';

import * as actions from '../../actions';

class ProfileForm extends Component {
  render() {
    return (
      <View>
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
                value => this.props.userLocationInputChanged({ prop: 'street', value })
              }
            />
          </CardSection>
          <CardSection>
            <Input
              label="City"
              placeholder="Salt Lake City"
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
              value={this.props.location.zipcode}
              onChangeText={
                value => this.props.userLocationInputChanged({ prop: 'zipcode', value })
              }
            />
          </CardSection>
        </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { firstName, lastName, location } = user;
  return { firstName, lastName, location };
};

export default connect(mapStateToProps, actions)(ProfileForm);

ProfileForm.propTypes = {
  firstName: React.PropTypes.string,
  lastName: React.PropTypes.string,
};
