import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import { meetupChange, addMeetup } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class MeetupLocationCreate extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onButtonPress() {
    const { name, description, start, end, state, venue, voteStart, voteEnd } = this.props;
    this.props.addMeetup({ name, description, start, end, state, venue, voteStart, voteEnd });
  }

  onStatePress() {
    Actions.states();
  }

  onChange(prop, value) {
    this.props.meetupChange(prop, value);
  }

  render() {
    let venue;
    if (this.props.venue.length === 0) {
      venue = 'location';
    } else {
      venue = this.props.venue;
    }

    let button;
    if (!this.props.loading) {
      button = (<Button
        onPress={this.onButtonPress.bind(this)}
      >
        Create Meetup
      </Button>);
    } else {
      button = <CardSection><Spinner size='small' /></CardSection>;
    }

    return (
      <Card>
        <View><Text>{`1. What state will ${this.props.name} be in?`}</Text></View>
        <CardSection>
          <Text style={styles.pickerTextStyle}>{this.props.location}</Text>
          <Button onPress={this.onStatePress.bind(this)}>Change State</Button>
        </CardSection>

        <View><Text>{`2. What kind of place do you want ${this.props.name} to be in?`}</Text></View>
        <CardSection>
          <Input
            label="Venue"
            placeholder="This needs to be a picker or something"
            value={this.props.venue}
            onChangeText={value => this.onChange('venue', value)}
          />
        </CardSection>

        <View>
        <Text>
          {`3. We will find some great ${venue}s ` +
          'for you that will let everyone meet in the middle. ' +
          'When do you want to start voting on which is the best? ' +
          'No guests can RSVP after this time.'}
        </Text>
        </View>
        <CardSection style={{ alignItems: 'center' }}>
          <Text style={styles.pickerTextStyle}>Vote Start</Text>
          <DatePicker
            style={{ flex: 2 }}
            date={this.props.voteStart}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Choose"
            cancelBtnText="Cancel"
            onDateChange={(value) => this.onChange('voteStart', value)}
          />
        </CardSection>

        <View>
        <Text>
          {'4. When do you want voting to end? The location will be locked after this time.'}
        </Text>
        </View>
        <CardSection style={{ alignItems: 'center' }}>
          <Text style={styles.pickerTextStyle}>Vote End</Text>
          <DatePicker
            style={{ flex: 2 }}
            date={this.props.voteEnd}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Choose"
            cancelBtnText="Cancel"
            onDateChange={(value) => this.onChange('voteEnd', value)}
          />
        </CardSection>

        <CardSection style={{ justifyContent: 'center' }}>
          {button}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
    alignSelf: 'center'
  }
};

const mapStateToProps = ({ meetupForm, filter }) => {
  const { name, description, start, end, state, venue, voteStart, voteEnd } = meetupForm;
  console.log('state', state)
  const { location } = filter;
  const loading = meetupForm.loading ? true : false;
  return { name, description, start, end, state, venue, voteStart, voteEnd, loading, location };
};

export default connect(mapStateToProps, { meetupChange, addMeetup })(MeetupLocationCreate);
