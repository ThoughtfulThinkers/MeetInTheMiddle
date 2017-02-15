import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { Text, View, Share, TouchableWithoutFeedback, Alert } from 'react-native';
import { changeStatus, createVoting, changeLocation } from '../actions';

import GuestList from './GuestList';
import VotingList from './Voting/VotingList';
import { CardSection, Card, Button } from './common';

const getAve = (array) => {
  const sum = array.reduce((a, b) => a + b);
  return sum / array.length;
};

const getLatLon = (users) => {
  const usersArray = _.map(users, (val, uid) => {
    return { ...val, uid };
  });
  const latArray = usersArray.map(user => user.lat);
  const lonArray = usersArray.map(user => user.lon);
  const lat = getAve(latArray);
  const lon = getAve(lonArray);
  return { lat, lon };
};


class Meetup extends Component {

  //status check, and changes if needed!
  componentDidMount() {
    const { start, end, voteStart, voteEnd, status } = this.props.meetup;
    console.log('meetup status: ', status);
    switch (this.props.meetup.status) {
      case 'created': {
        //the event has been created but has no guests.
        //RSVP is available
        //check if guests
        //if RSVP ends with no guests, mark event closed
        const guests = _.map(this.props.meetup.users, (val, uid) => {
          return { ...val, uid };
        });
        if (guests.length !== 0) {
          this.props.changeStatus(this.props.meetup, 'guests');
        } else if (moment().isSameOrAfter(voteStart)) {
          this.props.changeStatus(this.props.meetup, 'closed');
        }
        break;
      }
      case 'guests': {
        //the event has guests and RSVP is available.
        //If RSVP has ended, change status to foursquare
        if (moment().isSameOrAfter(voteStart)) {
          this.props.changeStatus(this.props.meetup, 'foursquare');
        }
        break;
      }
      case 'foursquare': {
        //send foursquare search and set votes, then change status to voting
        const { lat, lon } = getLatLon(this.props.meetup.users);
        this.props.createVoting(lat, lon, this.props.meetup);
        break;
      }
      case 'voting': {
        //the event is closed for RSVPs but is voting on location
        //if voting date is passed, shange status to 'location'
        if (moment().isSameOrAfter(voteEnd)) {
          this.props.changeStatus(this.props.meetup, 'location');
        }
        break;
      }
      case 'location': {
        //set location and change to set
        let votingArray = _.map(this.props.meetup.venues, (val, uid) => {
          return { ...val, uid };
        });
        votingArray = votingArray.sort((a, b) => b.votes - a.votes);
        this.props.changeLocation(votingArray[0], this.props.meetup.uid);
        this.props.changeStatus(this.props.meetup, 'set');
        break;
      }
      case 'set': {
        //the event's location has been chosen
        //if the event is over, close the event
        if (moment().isSameOrAfter(end)) {
          this.props.changeStatus(this.props.meetup, 'closed');
        }
        break;
      }
      case 'closed': {
        //the event is over.
        break;
      }
      default:
        throw new Error('Meetup has no status assigned!');
    }
  }

  //button methods
  onRSVPPress() {
    if (this.props.auth.loggedIn) {
      Actions.rsvp({ meetup: this.props.meetup });
    } else {
      Actions.login();
    }
  }

  onInvitePress() {
    const { start } = this.props.meetup;
    const day = moment(start).format('DD MMM YYYY');
    const time = moment(start).format('h:mm a');
    Share.share({
      message: `I'm planning to go to the ${this.props.meetup.name} meetup on ${day} at ${time}.\nWould you like to join me?\n\nDescription: ${this.props.meetup.description}`,
      title: `Join me at the ${this.props.meetup.name} meetup`
    });
    // Actions.invite({ meetup: this.props.meetup });
  }

  onMapPress() {
    Actions.map({ meetup: this.props.meetup });
  }

  onChatPress() {
    Actions.chat({ meetup: this.props.meetup });
  }

  onVotePress() {
    const votingArray = _.map(this.props.meetup.venues, (val, uid) => {
      return { ...val, uid };
    });
    Actions.voting({ venues: votingArray });
  }

  //render methods
  renderLocation(status) {
    if (status === 'set' || status === 'closed') {
      const { location } = this.props.meetup;
      return (
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.textStyle}>Location: {location.name}</Text>
          <Text style={styles.textStyle}>Address: </Text>
          <View style={styles.addressView}>
          {location.formattedAddress.map((line, i) => <Text style={styles.addressStyle} key={i}>{line}</Text>)}
          </View>
        </CardSection>);
    }
      return <Text />;
  }

  renderMap(status) {
    if (status === 'created') {
      return <Text />;
    }
    return (
      <Button onPress={this.onMapPress.bind(this)}>
          View Map
      </Button>);
  }

  renderRsvp(status) {
    if (status === 'created' || status === 'guests') {
      return (<CardSection style={{ flexDirection: 'row' }}>
              <Button onPress={this.onRSVPPress.bind(this)}>
                RSVP
              </Button>
              <Button onPress={this.onInvitePress.bind(this)}>
                Invite Friends
              </Button>
            </CardSection>);
    }
    return <Text />;
  }

  renderVoting(status) {
    if (status === 'voting') {
      let votingArray = _.map(this.props.meetup.venues, (val, uid) => {
        return { ...val, uid };
      });
      votingArray = votingArray.sort((a, b) => b.votes - a.votes);
      return (
          <CardSection style={{ flexDirection: 'column', height: 110 }}>
              <Text style={styles.textStyle}>Top Location: {votingArray[0].name}</Text>
              <Button onPress={this.onVotePress.bind(this)}>
                  Vote on Location
              </Button>
          </CardSection>);
    }
    return <Text />;
  }

  renderGuests(status) {
    if (status === 'created' || status === 'closed') {
      return <Text>No one is attending this meetup.</Text>;
    }
    const guests = _.map(this.props.meetup.users, (val, uid) => {
      return { ...val, uid };
    });
    return <GuestList guests={guests} />;
  }


  render() {
    const { meetup } = this.props;
    const { status } = meetup;
    return (
      <Card>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.titleStyle}>{meetup.name}</Text>
          <Text style={styles.textStyle}>Start: {meetup.start}</Text>
          <Text style={styles.textStyle}>End: {meetup.end}</Text>
          <Text style={styles.textStyle}>Venue: {meetup.venue.name}</Text>
          <Text style={styles.textStyle}>Description: {meetup.description}</Text>
        </CardSection>
          {this.renderLocation(status)}
          {this.renderRsvp(status)}

        <CardSection style={{ flexDirection: 'row' }}>
          {this.renderMap(status)}

          <Button onPress={this.onChatPress.bind(this)}>
            Chat
          </Button>
        </CardSection>

          {this.renderVoting(status)}

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.titleStyle}>Attending</Text>
          {this.renderGuests(status)}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 22,
    padding: 5,
    alignSelf: 'center'
  },
  textStyle: {
    fontSize: 18,
    padding: 5
  },
  addressStyle: {
    fontSize: 15,
  },
  addressView: {
    padding: 5
  }
};
const mapStateToProps = state => {
  const meetup = state.meetupForm;
  const { auth, user } = state;
  return { meetup, auth };
};

export default connect(mapStateToProps, { changeStatus, createVoting, changeLocation })(Meetup);
