import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableWithoutFeedback, Alert } from 'react-native';
import { setVote, voteChange } from '../../actions';
import { CardSection } from '../common';

class Vote extends Component {

  onRowPress() {
    const meetup = this.props.meetups[this.props.uid];
    if (!meetup) {
      Alert.alert('You are not registered for this meetup.');
    } else if (meetup.vote) {
      const voteCount = this.props.vote.votes + 1;
      this.props.voteChange(this.props.uid, this.props.vote.uid, voteCount);
    } else {
      const voteCount = this.props.vote.votes + 1;
      this.props.setVote(this.props.uid, this.props.vote.uid, voteCount);
    }
    Actions.pop({ refresh: { ...this.props.meetupForm } });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
      <View>
        <CardSection style={styles.containerStyle}>
          <Text style={styles.titleStyle}>{this.props.vote.name}</Text>
          <View>
          <Text style={styles.textStyle}>Votes: {this.props.vote.votes}</Text>
          </View>
        </CardSection>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleStyle: {
    fontSize: 18,
    padding: 5
  },
  textStyle: {
    fontSize: 14,
    padding: 5
  }
};

const mapStateToProps = state => {
  const { meetupForm, user } = state;
  const { meetups } = user;
  const { uid } = meetupForm;
  return { meetupForm, user, meetups, uid };
};

export default connect(mapStateToProps, { setVote, voteChange })(Vote);
