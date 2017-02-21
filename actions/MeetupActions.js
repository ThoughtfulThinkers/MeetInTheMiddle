import firebase from 'firebase';
import _ from 'lodash';

import {
  FETCH_MEETUPS,
  FETCH_MEETUPS_SUCCESS,
  FETCH_USER_MEETUPS,
  FETCH_USER_MEETUPS_SUCCESS,
} from './types';

export const meetupsFetch = (city) => {
  return (dispatch) => {
    dispatch({ type: FETCH_MEETUPS });

    const ref = firebase.database().ref('/meetups');
    ref.orderByChild('state').equalTo(city).on('value', (snapshot) => {
      dispatch({ type: FETCH_MEETUPS_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const userMeetupsFetch = () => {
    return (dispatch) => {
      dispatch({ type: FETCH_USER_MEETUPS });

      //return empty object if user not logged in
      const { currentUser } = firebase.auth();

      if (!currentUser) {
        return dispatch({ type: FETCH_USER_MEETUPS_SUCCESS, payload: {} });
      }

      //otherwise return the user's meetup ids; these are returned as a nested object
      firebase.database().ref(`/users/${currentUser.uid}/meetups`).on('value', (snapshot) => {
        let meetups = _.map(snapshot.val(), (val, uid) => {
          return { ...val, uid };
        });
        const events = {};
        meetups = meetups.map((meetup) => {
          return firebase.database().ref(`meetups/${meetup.uid}`).on('value', (snapshot2) => {
            events[meetup.uid] = snapshot2.val();
          });
        });
        Promise.all(meetups)
        .then(() => dispatch({ type: FETCH_USER_MEETUPS_SUCCESS, payload: events }));
      });
    };
  };
