import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { CardSection } from './common';

class Meetup extends Component {
  render() {
    return (
      <Text>{this.props.meetup.name}</Text>
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

export default Meetup;
