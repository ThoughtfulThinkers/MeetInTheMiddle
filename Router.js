import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Chat from './components/Chat';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Map from './components/Map';
import LocationSelector from './components/LocationSelector';
import ProfileForm from './components/Profile/ProfileForm';
import MeetupCreate from './components/MeetupCreate';
import MeetupLocationCreate from './components/MeetupLocationCreate';
import Meetup from './components/Meetup';
import Test from './components/Test';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene
          key="login"
          component={LoginForm}
          title="Login"
          rightTitle="Profile"
          onRight={() => Actions.profileForm()}

        />
        <Scene key="chat" component={Chat} title="Chat" style={{ paddingBottom: 40 }} />
        <Scene key="map" component={Map} title="Map" />
        <Scene
          initial
          key="meetups"
          component={Home}
          title="Meet In The Middle"
          leftTitle="Settings"
          onLeft={() => Actions.profileForm()}
          rightTitle="Add"
          onRight={() => Actions.add()}
        />
        <Scene
          key="profileForm"
          component={ProfileForm}
          title="Profile"
          leftTitle="Login"
          onLeft={() => Actions.login()}
        />
        <Scene key="test" component={Test} title="Test" />
        <Scene key="add" component={MeetupCreate} title="Add Meetup" />
        <Scene key="addLocation" component={MeetupLocationCreate} title="Location Settings" />
        <Scene key="meetup" component={Meetup} title="Meetup" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
