import React, { Component } from 'react';
import firebase from 'firebase';
import Exponent from 'exponent';
import { Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { setRsvp, changeRSVP, changeStatus } from '../actions';
import LocationSelector from './LocationSelector';
import { CardSection, Card, Button } from './common';

class RSVP extends Component {

  componentDidMount() {
    const { currentUser } = firebase.auth();
    if (!currentUser) {
      Actions.login();
    }
  }

  onPress() {
    const { lat, lon, meetup, firstName, lastName } = this.props;
    const { uid, users } = meetup;
    const name = `${firstName} ${lastName}`;
    this.props.setRsvp(lat, lon, uid, users, name);
    this.props.changeStatus(this.props.meetup, 'guests');
    Actions.pop();
  }

  onCurrentLocationPress() {
      const { Location, Permissions } = Exponent;
      Permissions.askAsync(Permissions.LOCATION)
      .then(response => {
        if (response.status === 'granted') {
          Location.getCurrentPositionAsync({ enableHighAccuracy: true })
          .then(data => {
            const { latitude, longitude } = data.coords;
            this.props.changeRSVP(latitude, longitude);
            Alert.alert('Location set, please confirm RSVP.');
          });
        }
          throw new Error('Location permission not granted');
      })
      .catch(err => console.log(err));
    }

    onPreferredLocationPress() {
      const { lat, lon } = this.props.user.location;
      this.props.changeRSVP(lat, lon);
      Alert.alert('Location set, please confirm RSVP.');
    }

  render() {
    return (
      <Card>
        <CardSection style={{ justifyContent: 'center' }}>
          <Text style={styles.titleStyle}>
            Where are you coming from?
          </Text>
        </CardSection>
        <CardSection>
          <Button onPress={this.onCurrentLocationPress.bind(this)}>
            Current Location
          </Button>
          <Button onPress={this.onPreferredLocationPress.bind(this)}>
            Profile Location
          </Button>
        </CardSection>
        <CardSection>
          <LocationSelector />
        </CardSection>
        <CardSection>
          <Button onPress={this.onPress.bind(this)}>
            Confirm RSVP
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18
  }
};

const mapStateToProps = ({ rsvp, user }) => {
  const { lat, lon } = rsvp;
  const { firstName, lastName } = user;
  return { lat, lon, firstName, lastName, user };
};

export default connect(mapStateToProps, { setRsvp, changeRSVP, changeStatus })(RSVP);
