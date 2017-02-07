import React from 'react';
import { Components } from 'exponent';
import { Actions } from 'react-native-router-flux';

export default class Map extends React.Component {
  render() {
    return (
      <Components.MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}
