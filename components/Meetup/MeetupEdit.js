import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import moment from 'moment';
import firebase from 'firebase';
import _ from 'lodash';
import { Text, View, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import VenuePicker from './Venues/VenuePicker';
import {
  meetupChange,
  meetupEdit,
  fetchMeetups,
  meetupsFetch,
  userMeetupsFetch,
  deleteMeetup } from '../../actions';
import { Card, CardSection, Input, Button, Spinner, DeleteButton } from '../common';

class MeetupEdit extends Component {

  componentDidMount() {
    if (!this.props.loggedIn) {
      Actions.login({ type: 'reset' });
    } else {
      const { currentUser } = firebase.auth();
      if (!currentUser || currentUser.uid !== this.props.meetup.user) {
        Alert.alert('You aren\'t authorized to edit this meetup.');
        Actions.pop({ type: 'reset' });
      }
    }
  }

  onButtonPress() {
    if (this.props.meetup.name === '' || this.props.meetup.description === '') {
      Alert.alert('Please include a name and description.');
      return;
    }
    this.props.meetupEdit(this.props.meetup);
    this.props.meetupsFetch(this.props.location);
    this.props.userMeetupsFetch();
  }

  onChange(prop, value) {
    this.props.meetupChange(prop, value);
  }

  onStatePress() {
    Actions.states();
  }

  onVenuePress() {
    Actions.venues();
  }

  onDeletePress() {
    const guests = _.map(this.props.meetup.users, (val, uid) => {
      return uid;
    });
    this.props.deleteMeetup(this.props.meetup.uid, guests);
    Actions.meetups({ type: 'refresh' });
  }

  render() {
    const { meetup } = this.props;

    let button;
    if (!this.props.loading) {
      button = (
        <Button onPress={this.onButtonPress.bind(this)}>
          Save Changes
        </Button>);
    } else {
      button = <CardSection><Spinner size='small' /></CardSection>;
    }

    let deleteButton;
    if (!this.props.loading) {
      deleteButton = (
        <DeleteButton
          onPress={this.onDeletePress.bind(this)}
        >
          Delete Meetup
        </DeleteButton>);
    } else {
      deleteButton = <CardSection><Spinner size='small' /></CardSection>;
    }

    return (
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="Sarah's Birthday"
            value={meetup.name}
            onChangeText={value => this.onChange('name', value)}
          />
        </CardSection>

        <CardSection>
          <Input
            multiline
            label="Description"
            placeholder="Bring cake and presents"
            value={meetup.description}
            onChangeText={value => this.onChange('description', value)}
          />
        </CardSection>

        <CardSection style={{ alignItems: 'center' }}>
          <Text style={styles.pickerTextStyle}>Start</Text>
          <DatePicker
            style={{ flex: 2 }}
            date={meetup.start}
            minDate={meetup.voteEnd}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Choose"
            cancelBtnText="Cancel"
            onDateChange={(value) => this.onChange('start', value)}
          />
        </CardSection>

        <CardSection style={{ alignItems: 'center' }}>
          <Text style={styles.pickerTextStyle}>End</Text>
          <DatePicker
            style={{ flex: 2 }}
            date={meetup.end}
            minDate={meetup.start}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Choose"
            cancelBtnText="Cancel"
            onDateChange={(value) => this.onChange('end', value)}
          />
        </CardSection>

        <CardSection style={{ alignItems: 'center' }}>
          <Text style={styles.pickerTextStyle}>{this.props.meetup.state}</Text>
          <Button onPress={this.onStatePress.bind(this)}>Change State</Button>
        </CardSection>

        <CardSection style={{ alignItems: 'center' }}>
          <Text style={styles.pickerTextStyle}>{this.props.meetup.venue.name}</Text>
          <Button onPress={this.onVenuePress.bind(this)}>Change Venue</Button>
        </CardSection>

          <CardSection style={{ alignItems: 'center' }}>
            <Text style={styles.pickerTextStyle}>Vote Start</Text>
            <DatePicker
              style={{ flex: 2 }}
              date={meetup.voteStart}
              maxDate={meetup.voteEnd}
              mode="datetime"
              format="YYYY-MM-DD HH:mm"
              confirmBtnText="Choose"
              cancelBtnText="Cancel"
              onDateChange={(value) => this.onChange('voteStart', value)}
            />
          </CardSection>

          <CardSection style={{ alignItems: 'center' }}>
            <Text style={styles.pickerTextStyle}>Vote End</Text>
            <DatePicker
              style={{ flex: 2 }}
              date={meetup.voteEnd}
              minDate={meetup.voteStart}
              maxDate={meetup.start}
              mode="datetime"
              format="YYYY-MM-DD HH:mm"
              confirmBtnText="Choose"
              cancelBtnText="Cancel"
              onDateChange={(value) => this.onChange('voteEnd', value)}
            />
          </CardSection>

        <CardSection>
          {button}
          {deleteButton}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  deleteButton: {
    backgroundColor: '#1ba6bd'
  },
  deleteText: {
    color: 'white'
  },
};

const mapStateToProps = (state) => {
  const meetup = state.meetupForm;
  const location = state.filter.location;
  const loading = state.meetupForm.loading ? true : false;
  const { loggedIn } = state.auth;
  return { meetup, loading, location, loggedIn };
};

export default connect(mapStateToProps, { meetupChange,
                                          meetupEdit,
                                          meetupsFetch,
                                          userMeetupsFetch,
                                          deleteMeetup })(MeetupEdit);
