import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { userMeetupsFetch } from '../../actions';
import MeetupList from './MeetupList';
import { CardSection, Spinner } from '../common';


class UserMeetupListContainer extends Component {
  componentDidMount() {
    this.props.userMeetupsFetch();
  }

  render() {
    let textContent;
    if (this.props.loading) {
      textContent = <CardSection><Spinner size='small' /></CardSection>;
    } else if (this.props.meetups.length === 0) {
      textContent = <Text style={styles.emptyTextStyle}>You have no meetups scheduled.</Text>;
    } else {
      textContent = <Text style={styles.headerStyle}>Your Meetups</Text>;
    }
    return (
      <View style={styles.viewStyle}>
        {textContent}
        <MeetupList meetups={this.props.meetups} />
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    maxHeight: 200
  },
  headerStyle: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 5
  },
  textStyle: {
    fontSize: 18,
    padding: 5
  },
  emptyTextStyle: {
    fontSize: 18,
    padding: 5,
    color: 'rgba(0,0,0,0.7)'
  }
};

const mapStateToProps = state => {
  let meetups = _.map(state.meetups.userMeetups, (val, uid) => {
    return { ...val, uid };
  });
  meetups = meetups.sort((a, b) => {
    const aDate = moment(a.start);
    const bDate = moment(b.start);
    return aDate.diff(bDate);
  });
  const removeDate = moment().subtract(1, 'months');
  meetups = meetups.filter((a) => {
    return moment(a.end).isAfter(removeDate);
  });
  return { meetups, loading: state.meetups.userLoading };
};

export default connect(mapStateToProps, { userMeetupsFetch })(UserMeetupListContainer);
