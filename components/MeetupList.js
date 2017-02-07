import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { meetupFetch } from '../actions';
import { MeetupListItem } from './MeetupListItem';

class MeetupList extends Component {
  componentWillMount() {
    this.props.meetupFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
      return <MeetupListItem employee={employee} />;
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
  const meetups = _.map(state.meetups, (val, uid) => {
    return { ...val, uid };
  });

  return { meetups };
};

export default connect(mapStateToProps, { meetupFetch })(MeetupList);
