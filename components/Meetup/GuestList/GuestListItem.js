import React, { Component } from 'react';
import { Text } from 'react-native';
import { CardSection } from '../../common';

class GuestListItem extends Component {
  render() {
    return (
      <CardSection style={{ justifyContent: 'center' }}>
        <Text style={styles.titleStyle}>
          {this.props.guest}
        </Text>
      </CardSection>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18
  }
};

export default GuestListItem;
