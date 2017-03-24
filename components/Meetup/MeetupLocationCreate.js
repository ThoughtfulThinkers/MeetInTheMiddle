import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import * as actions from '../../actions';
import { Card, CardSection, Input, Button, Spinner } from '../common';

class MeetupLocationCreate extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onButtonPress() {
    const { name, description, start, end, state, venue, voteStart, voteEnd, privacy } = this.props;
    this.props.addMeetup({ name, description, start, end, state, venue, voteStart, voteEnd, privacy });
  }

  onStatePress() {
    Actions.states();
  }

  onChange(prop, value) {
    this.props.meetupChange(prop, value);
  }

  onVenuePress() {
    Actions.venues();
  }

  render() {
    const venue = this.props.venue.name;
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

    const thirtyMin = moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm');

    return (
      <Card>
        <View>
          <Text style={styles.descriptionStyle}>
            1. What state will your event be in?
          </Text>
        </View>
        <CardSection>
          <Text style={styles.pickerTextStyle}>{this.props.location}</Text>
          <Button onPress={this.onStatePress.bind(this)}>Change State</Button>
        </CardSection>

        <View>
          <Text style={styles.descriptionStyle}>
            2. What kind of place do you want your event to be in?
          </Text>
          </View>
        <CardSection style={{ alignItems: 'center' }}>
          <Text style={styles.pickerTextStyle}>{venue}</Text>
          <Button onPress={this.onVenuePress.bind(this)}>Change Venue</Button>
        </CardSection>

        <View>
          <Text style={styles.descriptionStyle}>
            3. When do you want to start voting on the location? People who RSVP after this date will not be able to influence the central location.
          </Text>
        </View>
        <CardSection style={{ alignItems: 'center' }}>
          <Text style={styles.pickerTextStyle}>Voting Starts</Text>
          <DatePicker
            style={{ flex: 2 }}
            date={this.props.voteStart}
            minDate={thirtyMin}
            maxDate={this.props.start}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Choose"
            cancelBtnText="Cancel"
            onDateChange={(value) => this.onChange('voteStart', value)}
          />
        </CardSection>

        <View>
        <Text style={styles.descriptionStyle}>
          {'4. When do you want voting to end? The location will be locked after this time.'}
        </Text>
        </View>
        <CardSection style={{ alignItems: 'center' }}>
          <Text style={styles.pickerTextStyle}>Location Selected</Text>
          <DatePicker
            style={{ flex: 2 }}
            date={this.props.voteEnd}
            minDate={this.props.voteStart}
            maxDate={this.props.start}
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
  },
  descriptionStyle: {
    fontSize: 15,
    padding: 10,
    lineHeight: 22
  }
};

const mapStateToProps = ({ meetupForm, filter }) => {
  const { name, description, start, end, state, venue, voteStart, voteEnd, privacy } = meetupForm;
  const { location } = filter;
  const loading = meetupForm.loading ? true : false;
  return { name, description, start, end, state, venue, voteStart, voteEnd, loading, location, privacy };
};

export default connect(mapStateToProps, actions)(MeetupLocationCreate);
