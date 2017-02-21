import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { googlePlacesConfig } from '../envConfig';
import {
  CHANGE_RSVP,
  SET_RSVP,
  SET_RSVP_SUCCESS,
  DELETE_RSVP_SUCCESS,
} from '../actions/types';
import { userMeetupsFetch } from './MeetupActions';

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

    firebase.database().ref(`/meetups/${meetupId}/users/${currentUser.uid}`)
      .set(guest)
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

export const editRsvp = (lat, lon, meetupId, users, name) => {
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

    const updates = {};
    updates[`/${currentUser.uid}`] = guest;

    firebase.database().ref(`/meetups/${meetupId}/users`)
    .update(updates)
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

export const deleteRsvp = (meetup) => {
  return (dispatch) => {
    dispatch({ type: SET_RSVP });

    const { currentUser } = firebase.auth();
    if (!currentUser) {
      Actions.login();
      return;
    }
    firebase.database().ref(`/meetups/${meetup.uid}/users/${currentUser.uid}`)
      .remove()
      .then(() => {
        firebase.database().ref(`/users/${currentUser.uid}/meetups/${meetup.uid}`)
          .remove()
          .then(() => {
            firebase.database().ref(`/meetups/${meetup.uid}`)
            .update({ '/status': 'created' })
            .then(() => {
              const newUsers = meetup.users;
              delete newUsers[currentUser.uid];
              const newMeetup = meetup;
              newMeetup.users = newUsers;
              dispatch({ type: DELETE_RSVP_SUCCESS, meetup: newMeetup, id: meetup.uid });
              dispatch(userMeetupsFetch());
              Actions.meetups({ type: 'reset' });
            })
            .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
        })
    .catch((err) => console.log(err));
  };
};
