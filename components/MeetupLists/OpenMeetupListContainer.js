import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text } from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { meetupsFetch, setText, setLocation } from '../../actions';
import MeetupList from './MeetupList';
import { CardSection, Spinner, Input, Button, IconButton } from '../common';


class OpenMeetupListContainer extends Component {

  componentWillMount() {
    this.props.meetupsFetch(this.props.location);
  }

  onPress() {
    Actions.states();
  }

  fetchMeetups() {
    this.props.meetupsFetch(this.props.location);
  }

  render() {
    let listContent;
    if (this.props.loading) {
      listContent = <CardSection><Spinner size='small' /></CardSection>;
    } else if (this.props.meetups.length === 0) {
      listContent = (
          <Text style={styles.textStyle}>
            There are no open meetups scheduled in this state.
          </Text>);
    } else {
      listContent = <MeetupList meetups={this.props.meetups} />;
    }
    return (
      <View style={styles.viewStyle}>
        <View style={styles.headerView}>
            <Text style={styles.headerStyle}>Open Meetups</Text>
            <IconButton name="ios-refresh" size={32} onPress={this.fetchMeetups.bind(this)} />
        </View>
        <CardSection style={styles.filterStyle}>
          <Text style={styles.filterTextStyle}>Events in </Text><Text style={styles.stateTextStyle}>{this.props.location}</Text>
        </CardSection>
        <CardSection>
          <Button onPress={this.onPress.bind(this)}>Change State</Button>
        </CardSection>
        {listContent}
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    maxHeight: 400
  },
  headerStyle: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 5,
    color: 'black'
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  filterStyle: {
    backgroundColor: '#1ba6bd',
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterTextStyle: {
    fontSize: 18,
    color: 'white',
  },
  textStyle: {
    fontSize: 18,
    padding: 5
  },
  stateTextStyle: {
    fontSize: 18,
    color: '#ffca63',
  }
};

const mapStateToProps = state => {
  let meetups = _.map(state.meetups.cityMeetups, (val, uid) => {
    return { ...val, uid };
  });
  meetups = meetups.sort((a, b) => {
    const aDate = moment(a.start);
    const bDate = moment(b.start);
    return aDate.diff(bDate);
  });
  meetups = meetups.filter((a) => {
    console.log(a.status, a.status === 'created')
    return a.status === 'created' && a.status === 'guests';
  });
  return {
    meetups,
    loading: state.meetups.cityLoading,
    location: state.filter.location,
    text: state.filter.text
  };
};

export default connect(mapStateToProps, { meetupsFetch, setLocation, setText })(OpenMeetupListContainer);
