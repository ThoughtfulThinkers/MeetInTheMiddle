import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { setLocation, meetupsFetch, meetupChange } from '../actions';
import { CardSection } from './common';

class StateItem extends Component {
  onRowPress() {
    this.props.setLocation(this.props.state);
    this.props.meetupChange('state', this.props.state);
    this.props.meetupsFetch(this.props.state);
    Actions.pop();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
      <View>
        <CardSection style={styles.containerStyle}>
          <Text style={styles.titleStyle}>{this.props.state}</Text>
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

export default connect(null, { setLocation, meetupsFetch, meetupChange })(StateItem);
