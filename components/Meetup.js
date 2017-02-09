import React, { Component } from 'react';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import GuestList from './GuestList';
import { CardSection, Card, Button } from './common';

class Meetup extends Component {
  onRSVPPress() {
    Actions.rsvp({ uid: this.props.meetup.uid });
  }

  onInvitePress() {
    console.log('invite');
  }

  onMapPress() {
    Actions.map();
  }

  onChatPress() {
    Actions.chat();
  }

  render() {
    const { meetup } = this.props;
    const guests = _.map(meetup.users, (val, uid) => {
      return { ...val, uid };
    });

    return (
      <Card>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.titleStyle}>{meetup.name}</Text>
          <Text style={styles.textStyle}>Start: {meetup.start}</Text>
          <Text style={styles.textStyle}>End: {meetup.end}</Text>
          <Text style={styles.textStyle}>Description: {meetup.description}</Text>
        </CardSection>
        <CardSection style={{ flexDirection: 'row' }}>
          <Button
            onPress={this.onRSVPPress.bind(this)}
          >
            RSVP
          </Button>

          <Button
            onPress={this.onInvitePress.bind(this)}
          >
            Invite Friends
          </Button>
        </CardSection>
        <CardSection style={{ flexDirection: 'row' }}>
          <Button
            onPress={this.onMapPress.bind(this)}
          >
            View Map
          </Button>

          <Button
            onPress={this.onChatPress.bind(this)}
          >
            Chat
          </Button>
        </CardSection>
        <CardSection>
          <Text style={styles.titleStyle}>Voting Here</Text>
        </CardSection>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.titleStyle}>Attending</Text>
          <GuestList guests={guests} />
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

export default Meetup;
