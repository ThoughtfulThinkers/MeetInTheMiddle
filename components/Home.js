import React, { Component } from 'react';
import { View } from 'react-native';
import UserMeetupListContainer from './UserMeetupListContainer';
import OpenMeetupListContainer from './OpenMeetupListContainer';

class Home extends Component {
  render() {
    return (
      <View>
        <UserMeetupListContainer />
        <OpenMeetupListContainer />
      </View>
    );
  }
}

export default Home;
