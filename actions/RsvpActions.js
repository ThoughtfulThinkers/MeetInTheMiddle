import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { googlePlacesConfig } from '../envConfig';
import {
  CHANGE_RSVP,
  SET_RSVP,
  SET_RSVP_SUCCESS
} from '../actions/types';

const { apiKey } = googlePlacesConfig;

export const changeRSVP = (lat, lon) => {
  return dispatch => {
    const search = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;
    fetch(search)
    .then(response => response.json())
    .then((data) => {
      const address = data.results[0].formatted_address;
      dispatch({
        type: CHANGE_RSVP,
        lat,
        lon,
        address
      });
    })
    .catch(err => console.log(err));
  };
};

export const setRsvp = (lat, lon, meetupId, users, name) => {
  return (dispatch) => {
    dispatch({ type: SET_RSVP });

    const { currentUser } = firebase.auth();
    if (!currentUser) {
      Actions.login();
      return;
    }

    const guest = {
      uid: currentUser.uid,
      name,
      lat,
      lon
    };
    const guests = { ...users, uid: guest };

    firebase.database().ref(`/meetups/${meetupId}/users`)
      .push(guest)
      .then(() => {
        firebase.database().ref(`/users/${currentUser.uid}/meetups/${meetupId}`)
        .set({ lat, lon, uid: meetupId })
        .then(() => {
          dispatch({ type: SET_RSVP_SUCCESS });
          Actions.meetups({ type: 'reset' });
        });
      })
      .catch((err) => console.log(err));
    };
};
