import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { meetupChange } from '../../../actions';
import { CardSection } from '../../common';

class Venue extends Component {
  onRowPress() {
    this.props.meetupChange('venue', this.props.venue);
    Actions.pop();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
      <View>
        <CardSection style={styles.containerStyle}>
          <Text style={styles.titleStyle}>{this.props.venue.name}</Text>
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
  titleStyle: {
    fontSize: 18,
    padding: 5
  }
};

export default connect(null, { meetupChange })(Venue);
