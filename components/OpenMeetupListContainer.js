import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { meetupsFetch } from '../actions';
import MeetupList from './MeetupList';
import { CardSection } from './common';


class OpenMeetupListContainer extends Component {
  componentWillMount() {
    this.props.meetupsFetch('New York');
  }

  render() {
    return (
      <View>
        <Text style={styles.headerStyle}>Open Meetups</Text>
        <CardSection style={styles.filterStyle}>
          <Text style={styles.filterTextStyle}>Search near New York</Text>
        </CardSection>
        <MeetupList meetups={this.props.meetups} />
      </View>
    );
  }
}

const styles = {
  headerStyle: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 5
  },
  filterStyle: {
    backgroundColor: '#007aff',
    justifyContent: 'center'
  },
  filterTextStyle: {
    fontSize: 18,
    color: 'white',
  }
};

const mapStateToProps = state => {
  const meetups = _.map(state.meetups.cityMeetups, (val, uid) => {
    return { ...val, uid };
  });
  return { meetups };
};

export default connect(mapStateToProps, { meetupsFetch })(OpenMeetupListContainer);
