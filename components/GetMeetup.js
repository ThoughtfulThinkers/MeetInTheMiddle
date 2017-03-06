import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { styles } from '../assets/Styles';
import { CardSection, Button, Input } from './common';

import { meetupById, changeSearch, resetErrorState } from '../actions';

class GetMeetup extends Component {

  onChange(value) {
    this.props.resetErrorState();
    this.props.changeSearch(value);
  }

  onPress() {
    this.props.meetupById(this.props.search);
  }

  render() {
    return (
      <CardSection>
          <Input labelStyleAdd={{ paddingLeft: 5 }} label='Invite Code' onSubmit={this.onPress.bind(this)} value={this.props.search} onChangeText={value => this.onChange(value)} placeholder='Enter Code' />
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
      </CardSection>
    );
  }
}

mapStateToProps = state => {
  return { search: state.meetups.search, error: state.user.error };
};

export default connect(mapStateToProps, {
  meetupById, changeSearch, resetErrorState
})(GetMeetup);
