import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';

import ChatRoom from './components/Chat/ChatRoom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Map from './components/Map';

import StateSelector from './components/StateSelector';
import VotingList from './components/Voting/VotingList';

import MeetupCreate from './components/MeetupCreate';
import MeetupLocationCreate from './components/MeetupLocationCreate';
import Meetup from './components/Meetup';
import MeetupEdit from './components/MeetupEdit';
import ProfileCreate from './components/Profile/ProfileCreate';
import ProfileUpdate from './components/Profile/ProfileUpdate';
import Test from './components/Test';

//RSVP
import LocationSelector from './components/LocationSelector';
import RSVP from './components/RSVP';

//Venue
import VenuePicker from './components/Venues/VenuePicker';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: Platform.OS === 'ios' ? 64 : 54 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Account Management" leftTitle="Home" onLeft={() => Actions.meetups({ type: 'reset' })} />
        <Scene key="profileCreate" component={ProfileCreate} title="Create Account" leftTitle="Home" onLeft={() => Actions.meetups({ type: 'reset' })} />
        <Scene key="profileUpdate" component={ProfileUpdate} title="Update Profile" leftTitle="Home" onLeft={() => Actions.meetups({ type: 'reset' })} />

        <Scene key="chat" component={ChatRoom} title="Chat Room" style={{ paddingBottom: 40 }} />
        <Scene key="map" component={Map} title="Map" />
        <Scene
          initial
          key="meetups"
          component={Home}
          title="Meet In The Middle"
          leftTitle="Settings"
          onLeft={() => Actions.login()}
          rightTitle="Add"
          onRight={() => Actions.add()}
        />
        <Scene key="test" component={Test} title="Test" />
        <Scene key="add" component={MeetupCreate} title="Add Meetup" />
        <Scene key="edit" component={MeetupEdit} title="Edit Meetup" />
        <Scene key="addLocation" component={MeetupLocationCreate} title="Location Settings" />
        <Scene
          key="meetup"
          component={Meetup}
          title="Meetup"
          rightTitle="Edit"
          onRight={() => Actions.edit()}
          leftTitle="Home"
          onLeft={() => Actions.meetups({ type: 'reset' })}
        />
        <Scene key="states" component={StateSelector} title="Choose State" />
        <Scene key="rsvp" component={RSVP} title="RSVP" />
        <Scene key="venues" component={VenuePicker} title="Choose Venue" />
        <Scene key="voting" component={VotingList} title="Vote for Location" />
        <Scene key="searchLocation" component={LocationSelector} title="Choose Location" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
