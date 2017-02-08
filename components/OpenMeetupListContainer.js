import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { meetupsFetch, setText, setLocation } from '../actions';
import MeetupList from './MeetupList';
import { CardSection, Spinner, Input, Button } from './common';


class OpenMeetupListContainer extends Component {
  componentWillMount() {
    this.props.meetupsFetch(this.props.location);
  }

  onPress() {
    const location = this.props.text;
    this.props.setLocation(location);
    this.props.meetupsFetch(location);
  }

  render() {
    let listContent;
    if (this.props.loading) {
      listContent = <CardSection><Spinner size='small' /></CardSection>;
    } else if (this.props.meetups.length === 0) {
      listContent = (
        <Text style={styles.textStyle}>
          There are no meetups scheduled in this state.
        </Text>);
    } else {
      listContent = <MeetupList meetups={this.props.meetups} />;
    }
    return (
      <View>
        <Text style={styles.headerStyle}>Open Meetups</Text>
        <CardSection style={styles.filterStyle}>
          <Text style={styles.filterTextStyle}>Events in {this.props.location}</Text>
        </CardSection>
        <CardSection>
          <Input
            label="State"
            value={this.props.text}
            onChangeText={state => this.props.setText(state)}
            placeholder="Enter State"
            secureTextEntry={false}
          />
          <Button onPress={this.onPress.bind(this)}>Search</Button>
        </CardSection>
        {listContent}
      </View>
    );
  }
}

const styles = {
  headerStyle: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 5
  },
  filterStyle: {
    backgroundColor: '#007aff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterTextStyle: {
    fontSize: 18,
    color: 'white',
    flex: 2
  },
  textStyle: {
    fontSize: 18,
    padding: 5
  },
};

const mapStateToProps = state => {
  const meetups = _.map(state.meetups.cityMeetups, (val, uid) => {
    return { ...val, uid };
  });
  return {
    meetups,
    loading: state.meetups.cityLoading,
    location: state.filter.location,
    text: state.filter.text
  };
};

export default connect(mapStateToProps, { meetupsFetch, setLocation, setText })(OpenMeetupListContainer);
