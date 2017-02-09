import firebase from 'firebase';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

import {
  FETCH_MEETUPS,
  FETCH_MEETUPS_SUCCESS,
  FETCH_USER_MEETUPS,
  FETCH_USER_MEETUPS_SUCCESS
} from './types';

export const meetupsFetch = (city) => {
  return (dispatch) => {
    dispatch({ type: FETCH_MEETUPS });
    const { currentUser } = firebase.auth();

    const ref = firebase.database().ref('/meetups');
    ref.orderByChild('state').equalTo(city).on('value', (snapshot) => {
      // console.log(snapshot.val());
      dispatch({ type: FETCH_MEETUPS_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const userMeetupsFetch = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_USER_MEETUPS });
    const { currentUser } = firebase.auth();
    if (!currentUser) {
      dispatch({ type: FETCH_USER_MEETUPS_SUCCESS, payload: [] });
      return;
    }
    firebase.database().ref(`/users/${currentUser}/meetups`).on('child_added', (snapshot) => {
      let meetups = _.map(snapshot.val(), (val, uid) => {
        return { ...val, uid };
      });
      meetups = meetups.map((meetup) => {
        // console.log('Testing key, ', meetup.key);
        return firebase.database().ref('/meetups').orderByKey().equalTo(meetup.uid);
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
