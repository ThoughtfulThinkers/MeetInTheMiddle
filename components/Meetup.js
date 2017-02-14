import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { changeStatus } from '../actions';
import GuestList from './GuestList';
import { CardSection, Card, Button } from './common';

class Meetup extends Component {
  onRSVPPress() {
    Actions.rsvp({ meetup: this.props.meetup });
  }

  onInvitePress() {
    Actions.invite({ meetup: this.props.meetup });
  }

  onMapPress() {
    Actions.map({ meetup: this.props.meetup });
  }

  onChatPress() {
    Actions.chat({ meetup: this.props.meetup });
  }

  checkStatus() {
    const { start, end, voteStart, voteEnd, status } = this.props.meetup;
    console.log('meetup status: ', status);
    switch (this.props.meetup.status) {
      case 'created': {
        if (moment().isSameOrAfter(voteStart)) {
          console.log('Event RSVP ended with no guests added. Event cancelled.');
          this.props.changeStatus(this.props.meetup, 'closed');
        } else {
          console.log('Time to set up components!');
        }
        break;
      }
      case 'guests': {
        if (moment().isSameOrAfter(voteStart)) {
          this.props.changeStatus(this.props.meetup, 'foursquare');
        } else {
          console.log('Time to set up components!');
        }
        break;
      }
      case 'foursquare': { break; }
      case 'voting': { break; }
      case 'set': { break; }
      case 'closed': { break; }
      default:
        throw new Error('Meetup has no status assigned!');
    }
  }

  render() {
    this.checkStatus();
    const { meetup } = this.props;
    const guests = _.map(meetup.users, (val, uid) => {
      return { ...val, uid };
    });

    let map;
    let guestList;
    if (guests.length === 0) {
      map = <Text />;
      guestList = <Text>No one is attending this meetup.</Text>;
    } else {
      map = (
        <Button onPress={this.onMapPress.bind(this)}>
          View Map
        </Button>);
      guestList = <GuestList guests={guests} />;
    }

    let rsvp;
    const today = new Date().getTime();
    const voteStart = new Date(meetup.voteStart).getTime();
    if (today >= voteStart) {
      rsvp = <Text />;
    } else {
      rsvp = (
      <CardSection style={{ flexDirection: 'row' }}>
        <Button onPress={this.onRSVPPress.bind(this)}>
          RSVP
        </Button>
        <Button onPress={this.onInvitePress.bind(this)}>
          Invite Friends
        </Button>
      </CardSection>
      );
    }

    return (
      <Card>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.titleStyle}>{meetup.name}</Text>
          <Text style={styles.textStyle}>Start: {meetup.start}</Text>
          <Text style={styles.textStyle}>End: {meetup.end}</Text>
          <Text style={styles.textStyle}>Venue: {meetup.venue.name}</Text>
          <Text style={styles.textStyle}>Description: {meetup.description}</Text>
        </CardSection>

          {rsvp}

        <CardSection style={{ flexDirection: 'row' }}>
          {map}

          <Button onPress={this.onChatPress.bind(this)}>
            Chat
          </Button>
        </CardSection>
        <CardSection>
          <Text style={styles.titleStyle}>Voting Here</Text>
        </CardSection>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.titleStyle}>Attending</Text>
          {guestList}
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
  voteStyle: {
    fontSize: 15,
    padding: 5,
    color: '#007aff' //TODO: color and content change based on vote start/end
  }
};

export default connect(null, { changeStatus })(Meetup);
