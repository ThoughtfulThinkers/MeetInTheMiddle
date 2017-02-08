import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { meetupsFetch } from '../actions';
import MeetupListItem from './MeetupListItem';

class MeetupList extends Component {
  componentWillMount() {
    this.props.meetupsFetch('New York');

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ meetups }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(meetups);
  }

  renderRow(meetup) {
    console.log(meetup);
      return <MeetupListItem meetup={meetup} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const meetups = _.map(state.meetups.cityMeetups, (val, uid) => {
    return { ...val, uid };
  });
    console.log('in mapstate', meetups);
  return { meetups };
};

export default connect(mapStateToProps, { meetupsFetch })(MeetupList);
