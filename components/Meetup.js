import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { CardSection, Card, Button } from './common';

class Meetup extends Component {
  onRSVPPress() {
    console.log('rsvp');
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
    return (
      <Card>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.titleStyle}>{this.props.meetup.name}</Text>
          <Text style={styles.textStyle}>Start: {this.props.meetup.start}</Text>
          <Text style={styles.textStyle}>End: {this.props.meetup.end}</Text>
          <Text style={styles.textStyle}>Description: {this.props.meetup.description}</Text>
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
        <CardSection>
          <Text style={styles.titleStyle}>Guest List Here</Text>
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
