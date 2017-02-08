import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userMeetupsFetch } from '../actions';
import MeetupList from './MeetupList';


class UserMeetupListContainer extends Component {
  componentWillMount() {
    this.props.userMeetupsFetch();
  }

  render() {
    return (
      <MeetupList />
    );
  }
}

export default connect(null, { userMeetupsFetch })(UserMeetupListContainer);
