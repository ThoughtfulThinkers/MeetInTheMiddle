import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Ionicons } from '@exponent/vector-icons';

import ChatRoom from './components/Chat/ChatRoom';
import ForgotPassword from './components/Profile/ForgotPassword';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import ManageAuth from './components/Profile/ManageAuth';
import ManageEmail from './components/Profile/ManageEmail';
import Map from './components/Meetup/Map';
import MeetupCreate from './components/Meetup/MeetupCreate';
import MeetupLocationCreate from './components/Meetup/MeetupLocationCreate';
import Meetup from './components/Meetup/Meetup';
import MeetupEdit from './components/Meetup/MeetupEdit';
import ProfileCreate from './components/Profile/ProfileCreate';
import ProfileUpdate from './components/Profile/ProfileUpdate';
import StateSelector from './components/States/StateSelector';
import VotingList from './components/Meetup/Voting/VotingList';

//RSVP
import LocationSelector from './components/LocationSelector';
import RSVP from './components/Meetup/RSVP/RSVP';
import RSVPEdit from './components/Meetup/RSVP/RSVPEdit';

//Venue
import VenuePicker from './components/Meetup/Venues/VenuePicker';

const RouterComponent = () => {
  return (
    <Router
      navigationBarStyle={{
        backgroundColor: '#1ba6bd',
        height: Platform.OS === 'ios' ? 64 : 75,
        paddingTop: Platform.OS === 'ios' ? 0 : 20 }}
      titleStyle={{ color: 'white' }}
      barButtonTextStyle={{ color: '#fef267' }}
      barButtonIconStyle={{ tintColor: 'rgb(254, 242, 103)' }}
      rightButtonTextStyle={{ color: '#ffca63' }}
      leftButtonTextStyle={{ color: '#ffca63' }}
      sceneStyle={{ paddingTop: Platform.OS === 'ios' ? 64 : 74 }}
    >
      <Scene key="auth">
        <Scene initial key="meetups" component={Home} title="Meet In The Middle" leftButtonImage={require('./assets/images/settings.png')} onLeft={() => Actions.login({ type: 'reset' })} rightButtonImage={require('./assets/images/add.png')} onRight={() => Actions.add()} />
        <Scene key="add" component={MeetupCreate} title="Add Meetup" />
        <Scene key="addLocation" component={MeetupLocationCreate} title="Location Settings" />
        <Scene key="chat" component={ChatRoom} title="Chat Room" style={{ paddingBottom: 40 }} />
        <Scene key="edit" component={MeetupEdit} title="Edit Meetup" />
        <Scene key="forgotPassword" component={ForgotPassword} title="Rest Password" onBack={() => Actions.login({ type: 'reset' })} />
        <Scene key="login" component={LoginForm} title="Account Management" leftButtonImage={require('./assets/images/house.png')} onLeft={() => Actions.meetups({ type: 'reset' })} />
        <Scene key="manageAuth" component={ManageAuth} title="Update Authentication" leftButtonImage={require('./assets/images/settings.png')} onLeft={() => Actions.profileUpdate({ type: 'reset' })} />
        <Scene key="manageEmail" component={ManageEmail} title="Update Email Address" leftButtonImage={require('./assets/images/settings.png')} onLeft={() => Actions.profileUpdate({ type: 'reset' })} />
        <Scene key="map" component={Map} title="Map" />
        <Scene key="meetup" component={Meetup} title="Meetup" rightButtonImage={require('./assets/images/edit.png')} onRight={() => Actions.edit()} leftButtonImage={require('./assets/images/house.png')} onLeft={() => Actions.meetups({ type: 'reset' })} />
        <Scene key="profileCreate" component={ProfileCreate} title="Create Account" leftButtonImage={require('./assets/images/house.png')} onLeft={() => Actions.meetups({ type: 'reset' })} />
        <Scene key="profileUpdate" component={ProfileUpdate} title="Update Profile" leftButtonImage={require('./assets/images/house.png')} onLeft={() => Actions.meetups({ type: 'reset' })} />
        <Scene key="rsvp" component={RSVP} title="RSVP" />
        <Scene key="rsvpEdit" component={RSVPEdit} title="Edit RSVP" />
        <Scene key="searchLocation" component={LocationSelector} title="Choose Location" />
        <Scene key="states" component={StateSelector} title="Choose State" />
        <Scene key="venues" component={VenuePicker} title="Choose Venue" />
        <Scene key="voting" component={VotingList} title="Vote for Location" />
      </Scene>
    </Router>
  );
};

// Parade — #1ba6bd
// Strawberry — #ff4c50
// Sandcastle — #ffca63
// Caribbean Green - #06D6A0

export default RouterComponent;
