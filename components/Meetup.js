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

  componentDidMount() {
    const { start, end, voteStart, voteEnd } = this.props.meetup;
    const { status } = this.props;
    this.checkStatus(status, start, end, voteStart, voteEnd);
  }

  checkStatus(status, start, end, voteStart, voteEnd) {
    let fillerStatus = status;
    let statusSet = false;
    while (!statusSet) {
      switch (fillerStatus) {
        case 'created': {
          const guests = _.map(this.props.meetup.users, (val, uid) => {
            return { ...val, uid };
          });
          if (guests.length !== 0) {
            fillerStatus = 'guests';
          } else if (moment().isSameOrAfter(voteStart)) {
            fillerStatus = 'closed';
          } else {
            statusSet = true;
          }
          break;
        }
        case 'guests': {
          if (moment().isSameOrAfter(voteStart)) {
            fillerStatus = 'foursquare';
          } else {
            statusSet = true;
          }
          break;
        }
        case 'foursquare': {
          const { lat, lon } = getLatLon(this.props.meetup.users);
          this.props.createVoting(lat, lon, this.props.meetup);
          fillerStatus = 'voting';
          break;
        }
        case 'voting': {
          if (moment().isSameOrAfter(voteEnd)) {
            fillerStatus = 'location';
          } else {
            statusSet = true;
          }
          break;
        }
        case 'location': {
          let votingArray = _.map(this.props.meetup.venues, (val, uid) => {
            return { ...val, uid };
          });
          votingArray = votingArray.sort((a, b) => b.votes - a.votes);
          this.props.changeLocation(votingArray[0], this.props.meetup.uid);
          fillerStatus = 'set';
          break;
        }
        case 'set': {
          if (moment().isSameOrAfter(end)) {
            fillerStatus = 'closed';
          } else {
            statusSet = true;
          }
          break;
        }
        case 'closed': {
          statusSet = true;
          break;
        }
        default:
        throw new Error('Meetup has no status assigned!');
      }
    }
    this.props.changeStatus(this.props.meetup, fillerStatus);
  }

  //button methods
  onRSVPPress() {
    if (this.props.auth.loggedIn) {
      if (!this.props.user.meetups[this.props.meetup.uid]) {
        Actions.rsvp({ meetup: this.props.meetup });
      } else {
        Actions.rsvpEdit({ meetup: this.props.meetup });
      }
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
      return (
              <Button onPress={this.onRSVPPress.bind(this)}>
                RSVP
              </Button>);
    }
    return <Text />;
  }

  renderInvite(status) {
    if (status === 'created' || status === 'guests') {
      return (
              <Button onPress={this.onInvitePress.bind(this)}>
                Invite Friends
              </Button>);
    }
    return <Text />;
  }

  renderVoting(status) {
    if (status === 'voting') {
        let votingArray = _.map(this.props.meetup.venues, (val, uid) => {
          return { ...val, uid };
        });
        if (votingArray.length === 0) {
          return null;
        }
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
    const { meetup, status } = this.props;
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
        <CardSection style={{ flexDirection: 'row' }}>
          {this.renderRsvp(status)}
          {this.renderInvite(status)}
        </CardSection>

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
  },
};
const mapStateToProps = state => {
  const meetup = state.meetupForm;
  const status = state.meetupForm.status;
  const { auth, user } = state;
  return { meetup, auth, user, status };
};

export default connect(mapStateToProps, { changeStatus, createVoting, changeLocation })(Meetup);
