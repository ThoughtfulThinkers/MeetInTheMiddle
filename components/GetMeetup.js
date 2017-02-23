import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { CardSection, Button, Input } from './common';

import { meetupById, changeSearch } from '../actions';

class GetMeetup extends Component {

  onChange(value) {
    this.props.changeSearch(value);
  }

  onPress() {
    this.props.meetupById(this.props.search);
  }

  render() {
    return (
      <CardSection>
          <Input labelStyleAdd={{ paddingLeft: 5 }} label='Invite Code' onSubmit={this.onPress.bind(this)} value={this.props.search} onChangeText={value => this.onChange(value)} placeholder='Enter Code' />
      </CardSection>
    );
  }
}

mapStateToProps = state => {
  return { search: state.meetups.search };
};

export default connect(mapStateToProps, {
  meetupById, changeSearch
})(GetMeetup);
