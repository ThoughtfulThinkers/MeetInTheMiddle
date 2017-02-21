import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { setCurrentMeetup } from '../../actions';
import { CardSection } from '../common';

class MeetupListItem extends Component {
  onRowPress() {
    this.props.setCurrentMeetup(this.props.meetup);
    Actions.meetup();
  }

  renderVote(status, venues, location) {
    if (status === 'voting') {
      if (this.props.meetup.venues) {
        let votingArray = _.map(this.props.meetup.venues, (val, uid) => {
          return { ...val, uid };
        });
        votingArray = votingArray.sort((a, b) => b.votes - a.votes);
        return <Text style={styles.voteStyle}>Vote: {votingArray[0].name}</Text>;
        }
        return null;
    }
    if (status === 'set') {
      return <Text style={styles.locationStyle}>{location.name}</Text>;
    }
    return <Text />;
  }

  render() {
    const { name, state, start, location, status, venues } = this.props.meetup;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
      <View>
      <CardSection style={styles.containerStyle}>
        <View style={styles.rowStyle}>
          <Text style={styles.titleStyle}>{name}</Text>
          <Text style={styles.detailStyle}>{moment(start).format('MMMM Do YYYY, h:mm a')}</Text>
        </View>
        <View style={styles.rowStyle}>
          {this.renderVote(status, venues, location)}
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
    padding: 5,
  },
  detailStyle: {
    fontSize: 15,
    padding: 5,
    color: 'rgba(0,0,0,0.6)'
  },
  voteStyle: {
    fontSize: 15,
    padding: 5,
    color: '#ff4c50'
  },
  locationStyle: {
    fontSize: 15,
    padding: 5,
    color: 'rgba(0,0,0,0.8)'
  }
};

export default connect(null, { setCurrentMeetup })(MeetupListItem);
