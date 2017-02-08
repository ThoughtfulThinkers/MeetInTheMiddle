import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Chat from './components/Chat';
import LoginForm from './components/LoginForm';
import Map from './components/Map';
import Home from './components/Home';
import LocationSelector from './components/LocationSelector';
import Test from './components/Test';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene
          key="login"
          component={LoginForm}
          title="Login"
          rightTitle="Home"
          onRight={() => Actions.meetups()}
        />
        <Scene key="chat" component={Chat} title="Chat" style={{ paddingBottom: 40 }} />
        <Scene key="map" component={Map} title="Map" />
        <Scene
          initial
          key="meetups"
          component={Home}
          title="Meet In The Middle"
          leftTitle="Login"
          onLeft={() => Actions.login()}
          rightTitle="Test"
          onRight={() => Actions.test()}
        />
        <Scene key="test" component={Test} title="Test" />
        <Scene key="setLocation" component={LocationSelector} title="Select Location" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
