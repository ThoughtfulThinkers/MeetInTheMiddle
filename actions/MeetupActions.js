import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  FETCH_MEETUPS_SUCCESS,
  FETCH_USER_MEETUPS_SUCCESS,
  MEETUP_CREATE_SUCCESS
} from './types';

export const meetupsFetch = (city) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    const ref = firebase.database().ref('/meetups');
    ref.orderByChild('city').equalTo(city).on('value', (snapshot) => {
      // console.log(snapshot.val());
      dispatch({ type: FETCH_MEETUPS_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const userMeetupsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser}/meetups`).on('child_added', (snapshot) => {
      const meetups = snapshot.val().map((meetup) => {
        // console.log('Testing key, ', meetup.key);
        return firebase.database().ref('/meetups').orderByKey().equalTo(meetup.key);
      });
      Promise.all(meetups)
      .then((data) => {
        // console.log('User fetch meetups success: ', data);
        dispatch({ type: FETCH_USER_MEETUPS_SUCCESS, payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
    });
  };
};

export const createMeetup = (meetup) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
  firebase.database().ref('/meetups')
    .push(meetup)
    .then(({ key }) => {
      // console.log('created meetup: ', key);
      dispatch({ type: MEETUP_CREATE_SUCCESS });
      Actions.meetup({ type: 'reset', id: key });
    });
  };
};
