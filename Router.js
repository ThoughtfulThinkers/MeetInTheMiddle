import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Test from './components/Test';
import Map from './components/Map';
import Chat from './components/Chat';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene
          rightTitle="Test"
          onRight={() => Actions.test()}
          key="login" component={LoginForm} title="Login" initial
        />
        <Scene key="test" component={Test} title="Test" />
        <Scene key="map" component={Map} title="Map" />
        <Scene key="chat" component={Chat} title="Chat" style={{ paddingBottom: 40 }} />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
