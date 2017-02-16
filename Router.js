import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';


import ChatRoom from './components/Chat/ChatRoom';
import ForgotPassword from './components/Profile/ForgotPassword';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import ManageAuth from './components/Profile/ManageAuth';
import Map from './components/Map';
import MeetupCreate from './components/MeetupCreate';
import MeetupLocationCreate from './components/MeetupLocationCreate';
import Meetup from './components/Meetup';
import MeetupEdit from './components/MeetupEdit';
import ProfileCreate from './components/Profile/ProfileCreate';
import ProfileUpdate from './components/Profile/ProfileUpdate';
import StateSelector from './components/StateSelector';
import Test from './components/Test';
import VotingList from './components/Voting/VotingList';

//RSVP
import LocationSelector from './components/LocationSelector';
import RSVP from './components/RSVP';

//Venue
import VenuePicker from './components/Venues/VenuePicker';

const RouterComponent = () => {
  return (
    <Router navigationBarStyle={{ backgroundColor: '#1ba6bd' }} titleStyle={{ color: 'white' }} barButtonTextStyle={{ color: '#fef267' }} barButtonIconStyle={{ tintColor: 'rgb(254, 242, 103)' }} rightButtonTextStyle={{ color: '#ffca63' }} leftButtonTextStyle={{ color: '#ffca63' }} sceneStyle={{ paddingTop: Platform.OS === 'ios' ? 64 : 54 }}>
      <Scene key="auth">
        <Scene initial key="meetups" component={Home} title="Meet In The Middle" leftTitle="Settings" onLeft={() => Actions.login({ type: 'reset' })} rightTitle="Add" onRight={() => Actions.add()} />
        <Scene key="add" component={MeetupCreate} title="Add Meetup" />
        <Scene key="addLocation" component={MeetupLocationCreate} title="Location Settings" />
        <Scene key="chat" component={ChatRoom} title="Chat Room" style={{ paddingBottom: 40 }} />
        <Scene key="edit" component={MeetupEdit} title="Edit Meetup" />
        <Scene key="forgotPassword" component={ForgotPassword} title="Rest Password" />
        <Scene key="login" component={LoginForm} title="Account Management" leftTitle="Home" onLeft={() => Actions.meetups({ type: 'reset' })} />
        <Scene key="manageAuth" component={ManageAuth} title="Update Authentication" leftTitle="Account" onLeft={() => Actions.profileUpdate({ type: 'reset' })} />
        <Scene key="map" component={Map} title="Map" />
        <Scene key="meetup" component={Meetup} title="Meetup" rightTitle="Edit" onRight={() => Actions.edit()} leftTitle="Home" onLeft={() => Actions.meetups({ type: 'reset' })} />
        <Scene key="profileCreate" component={ProfileCreate} title="Create Account" leftTitle="Home" onLeft={() => Actions.meetups({ type: 'reset' })} />
        <Scene key="profileUpdate" component={ProfileUpdate} title="Update Profile" leftTitle="Home" onLeft={() => Actions.meetups({ type: 'reset' })} />
        <Scene key="test" component={Test} title="Test" />
        <Scene key="rsvp" component={RSVP} title="RSVP" />
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

export default RouterComponent;
