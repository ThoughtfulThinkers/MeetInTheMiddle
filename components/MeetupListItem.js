import React, { Component } from 'react';
import { Text } from 'react-native';
import { CardSection } from './common';

class MeetupListItem extends Component {
  render() {
    const { name } = this.props.meetup;

    return (
      <CardSection>
        <Text style={styles.titleStyle}>
          {name}
        </Text>
      </CardSection>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default MeetupListItem;
