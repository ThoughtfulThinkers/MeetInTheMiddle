import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  FETCH_MEETUPS_SUCCESS,
  FETCH_USER_MEETUPS_SUCCESS,
  MEETUP_CREATE
} from './types';

export const meetupsFetch = (city) => {
  const { currentUser } = firebase.auth();
  const ref = firebase.database().ref('./meetups');

  return (dispatch) => {
    ref.orderByChild('city').equalTo(city).on('child_added', (snapshot) => {
      dispatch({ type: FETCH_MEETUPS_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const userMeetupsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`./users/${currentUser}/meetups`).on('child_added', (snapshot) => {
      const meetups = snapshot.val().map((id) => {
        return firebase.database().ref('./meetups').orderByChild('id').equalTo(id);
      });
      Promise.all(meetups)
      .then((data) => {
        console.log('User fetch meetups success: ', data);
        dispatch({ type: FETCH_USER_MEETUPS_SUCCESS, payload: data });
      });
    });
  };
};

export const createMeetup = (meetup) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
  firebase.database().ref('/meetups')
    .push(meetup)
    .then(() => {
      dispatch({ type: MEETUP_CREATE });
      Actions.meetupsList({ type: 'reset' });
    });
  };
};
