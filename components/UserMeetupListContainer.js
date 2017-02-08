import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { userMeetupsFetch } from '../actions';
import MeetupList from './MeetupList';


class UserMeetupListContainer extends Component {
  componentWillMount() {
    this.props.userMeetupsFetch();
  }

  render() {
    return (
      <View>
        <Text style={styles.headerStyle}>Your Meetups</Text>
        <MeetupList />
      </View>
    );
  }
}

const styles = {
  headerStyle: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 5
  }
};

export default connect(null, { userMeetupsFetch })(UserMeetupListContainer);
