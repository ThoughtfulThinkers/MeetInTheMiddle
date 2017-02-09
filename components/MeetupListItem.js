import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { setCurrentMeetup } from '../actions';
import { CardSection } from './common';

class MeetupListItem extends Component {
  onRowPress() {
    this.props.setCurrentMeetup(this.props.meetup);
    Actions.meetup({ meetup: this.props.meetup });
  }

  render() {
    const { name, state, start, vote, uid } = this.props.meetup;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
      <View>
      <CardSection style={styles.containerStyle}>
        <View style={styles.rowStyle}>
          <Text style={styles.titleStyle}>{name}</Text>
          <Text style={styles.detailStyle}>{start}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.voteStyle}>{vote}</Text>
          <Text style={styles.detailStyle}>{state}</Text>
        </View>
      </CardSection>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'column'
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleStyle: {
    fontSize: 18,
    padding: 5
  },
  detailStyle: {
    fontSize: 15,
    padding: 5,
    color: 'grey'
  },
  voteStyle: {
    fontSize: 15,
    padding: 5,
    color: '#007aff' //TODO: color and content change based on vote start/end
  }
};

export default connect(null, { setCurrentMeetup })(MeetupListItem);
