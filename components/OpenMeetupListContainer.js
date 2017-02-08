import React, { Component } from 'react';
import { connect } from 'react-redux';
import { meetupsFetch } from '../actions';
import MeetupList from './MeetupList';


class UserMeetupListContainer extends Component {
  componentWillMount() {
    this.props.meetupsFetch('New York');
  }

  render() {
    return (
      <MeetupList />
    );
  }
}

export default connect(null, { meetupsFetch })(UserMeetupListContainer);
