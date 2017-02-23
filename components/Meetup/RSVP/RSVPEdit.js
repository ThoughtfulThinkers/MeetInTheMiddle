import React, { Component } from 'react';
import firebase from 'firebase';
import Exponent from 'exponent';
import { Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { setRsvp,
        changeRSVP,
        changeStatus,
        editRsvp,
        deleteRsvp,
        userInputChanged,
        resetErrorState } from '../../../actions';
import LocationSelector from '../../LocationSelector';
import { CardSection, Card, Button, DeleteButton } from '../../common';

class RSVPEdit extends Component {

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
    if (lat === 0 && lon === 0) {
      this.props.userInputChanged({ prop: 'error', value: 'Invalid location.' });
    } else {
      this.props.resetErrorState();
      this.props.editRsvp(lat, lon, uid, users, name);
      Actions.pop();
    }
  }

  onCurrentLocationPress() {
      this.props.resetErrorState();
      const { Location, Permissions } = Exponent;
      Permissions.askAsync(Permissions.LOCATION)
      .then(response => {
        if (response.status === 'granted') {
          Location.getCurrentPositionAsync({ enableHighAccuracy: true })
          .then(data => {
            const { latitude, longitude } = data.coords;
            this.props.changeRSVP(latitude, longitude);
          });
        }
          throw new Error('Location permission not granted');
      })
      .catch(err => console.log(err));
    }

    onPreferredLocationPress() {
      this.props.resetErrorState();
      const { lat, lon } = this.props.user.location;
      this.props.changeRSVP(lat, lon);
      Alert.alert('Location set, please confirm RSVP.');
    }

    onDeletePress() {
      this.props.resetErrorState();
      this.props.deleteRsvp(this.props.meetup);
      Actions.pop();
    }

  render() {
    return (
      <Card>
        <CardSection style={{ justifyContent: 'center' }}>
          <Text style={styles.titleStyle}>
            Where are you coming from?
            Please select a location in {this.props.meetupForm.state}.
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
          <Text style={styles.titleStyle}>Location: {this.props.address}</Text>
        </CardSection>
        <CardSection>
          <Button onPress={this.onPress.bind(this)}>
            Confirm RSVP
          </Button>
          <DeleteButton onPress={this.onDeletePress.bind(this)}>
            Not Attending
          </DeleteButton>
        </CardSection>
        <CardSection style={{ justifyContent: 'center' }}>
          <Text style={styles.errorStyle}>{this.props.error}</Text>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18
  },
  errorStyle: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
};

const mapStateToProps = (state, props) => {
  const { rsvp, user, meetupForm } = state;
  const { lat, lon, address } = rsvp;
  const { firstName, lastName, error } = user;
  const oldRSVP = user.meetups[props.meetup.uid];
  return { lat, lon, firstName, lastName, user, address, oldRSVP, meetupForm, error };
};

export default connect(mapStateToProps, { setRsvp,
                                          changeRSVP,
                                          changeStatus,
                                          editRsvp,
                                          deleteRsvp,
                                          userInputChanged,
                                          resetErrorState })(RSVPEdit);
