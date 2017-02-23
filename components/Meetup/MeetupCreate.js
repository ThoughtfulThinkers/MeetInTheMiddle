import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Text, Alert, View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { meetupChange, resetMeetup, userInputChanged, resetErrorState } from '../../actions';
import { Card, CardSection, Input, Button, IconButton } from '../common';

class MeetupCreate extends Component {

  componentDidMount() {
    if (!this.props.loggedIn) {
      Actions.login({ type: 'reset' });
    } else {
      this.props.resetMeetup();
    }
  }

  onButtonPress() {
    if (this.props.name === '' || this.props.description === '') {
      this.props.userInputChanged({ prop: 'error', value: 'Please include a name and description.' });
    } else {
      Actions.addLocation();
    }
  }

  onChange(prop, value) {
    this.props.resetErrorState();
    this.props.meetupChange(prop, value);
  }

  setPrivacy() {
    this.props.resetErrorState();
    const value = this.props.privacy ? false : true;
    this.props.meetupChange('privacy', value);
  }

  renderPrivacy() {
    if (this.props.privacy) {
      return (
        <CardSection style={styles.privacyStyle}>
              <IconButton name="md-checkbox-outline" size={32} onPress={this.setPrivacy.bind(this)} />
              <Text>Private Meetup</Text>
        </CardSection>
      );
    }
    return (
      <CardSection style={styles.privacyStyle}>
            <IconButton name="md-square-outline" size={32} onPress={this.setPrivacy.bind(this)} />
            <Text style={styles.pickerTextStyle}>Private Meetup</Text>
      </CardSection>
    );
  }

  render() {
    const start = moment().add(1, 'hour').format('YYYY-MM-DD HH:mm');

    return (
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="Sarah's Birthday"
            value={this.props.name}
            onChangeText={value => this.onChange('name', value)}
          />
        </CardSection>

        <CardSection>
          <Input
            multiline
            label="Description"
            placeholder="Bring cake and presents"
            value={this.props.description}
            onChangeText={value => this.onChange('description', value)}
          />
        </CardSection>

        <CardSection style={{ alignItems: 'center' }}>
          <Text style={styles.pickerTextStyle}>Start</Text>
          <DatePicker
            style={{ flex: 2 }}
            date={this.props.start}
            minDate={start}
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
            date={this.props.end}
            minDate={this.props.start}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Choose"
            cancelBtnText="Cancel"
            onDateChange={(value) => this.onChange('end', value)}
          />
        </CardSection>
        {this.renderPrivacy()}
        <CardSection>
          <Button
            onPress={this.onButtonPress.bind(this)}
          >
            Next
          </Button>
        </CardSection>
        <CardSection style={{ justifyContent: 'center' }}>
          <Text style={styles.errorStyle}>{this.props.error}</Text>
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
  errorStyle: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  privacyStyle: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
};

const mapStateToProps = ({ meetupForm, auth, user }) => {
  const { name, description, start, end, privacy } = meetupForm;
  const { loggedIn } = auth;
  const { error } = user;
  return { name, description, start, end, loggedIn, error, privacy };
};

export default connect(mapStateToProps, { meetupChange, resetMeetup, userInputChanged, resetErrorState })(MeetupCreate);
