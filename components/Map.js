import React from 'react';
import { Components } from 'exponent';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

const getAve = (array) => {
  const sum = array.reduce((a, b) => a + b);
  return sum / array.length;
};

export default class Map extends React.Component {
  render() {
    const usersArray = _.map(this.props.meetup.users, (val, uid) => {
      return { ...val, uid };
    });
    const latArray = usersArray.map(user => user.lat);
    const lonArray = usersArray.map(user => user.lon);
    const lat = getAve(latArray);
    const lon = getAve(lonArray);

    return (
      <Components.MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Components.MapView.Marker
          coordinate={{
            latitude: lat,
            longitude: lon,
          }}
          title="Middle Location"
          description="Your event will occur near here"
        />
      </Components.MapView>
    );
  }
}
