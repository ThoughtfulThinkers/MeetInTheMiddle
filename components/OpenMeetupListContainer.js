import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { meetupsFetch } from '../actions';
import MeetupList from './MeetupList';
import { CardSection } from './common';


class OpenMeetupListContainer extends Component {
  componentWillMount() {
    this.props.meetupsFetch('New York');
  }

  render() {
    let listContent;
    if (this.props.meetups.length === 0) {
      listContent = <Text style={styles.textStyle}>There are no meetups scheduled in this city.</Text>;
    } else {
      listContent = <MeetupList meetups={this.props.meetups} />;
    }
    return (
      <View>
        <Text style={styles.headerStyle}>Open Meetups</Text>
        <CardSection style={styles.filterStyle}>
          <Text style={styles.filterTextStyle}>Search near New York</Text>
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
    justifyContent: 'center'
  },
  filterTextStyle: {
    fontSize: 18,
    color: 'white',
  },
  textStyle: {
    fontSize: 18,
    padding: 5
  }
};

const mapStateToProps = state => {
  const meetups = _.map(state.meetups.cityMeetups, (val, uid) => {
    return { ...val, uid };
  });
  return { meetups };
};

export default connect(mapStateToProps, { meetupsFetch })(OpenMeetupListContainer);
