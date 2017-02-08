import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection } from './common';

class MeetupListItem extends Component {
  render() {
    const { name, state, start, vote } = this.props.meetup;

    return (
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

export default MeetupListItem;
