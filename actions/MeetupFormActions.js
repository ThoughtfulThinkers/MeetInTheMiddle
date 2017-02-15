import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  MEETUP_CHANGED,
  ADD_MEETUP,
  ADD_MEETUP_SUCCESS,
  SET_CURRENT_MEETUP,
  EDIT_MEETUP,
  EDIT_MEETUP_SUCCESS
} from './types';

export const meetupChange = (prop, value) => {
  return {
    type: MEETUP_CHANGED,
    prop,
    value
  };
};

export const addMeetup = (meetupDetails) => {
  return (dispatch) => {
  dispatch({ type: ADD_MEETUP });
  //const { currentUser } = firebase.auth();
  const meetup = {
    ...meetupDetails,
    chat: {},
    vote: {},
    users: {},
    location: '',
    status: 'created'
  };
  firebase.database().ref('/meetups')
    .push(meetup)
    .then(({ key }) => {
      dispatch({ type: ADD_MEETUP_SUCCESS });
      Actions.meetup({ type: 'reset', meetup });
    })
    .catch((err) => console.log(err));
  };
};

export const setCurrentMeetup = (meetup) => {
  return {
    type: SET_CURRENT_MEETUP,
    meetup
  };
};

export const meetupEdit = (meetup) => {
  return (dispatch) => {
  dispatch({ type: EDIT_MEETUP });
  //const { currentUser } = firebase.auth();
  const { name, description, start, end, state, venue, voteStart, voteEnd } = meetup;
  const updates = {};
  updates['/name'] = name;
  updates['/description'] = description;
  updates['/start'] = start;
  updates['/end'] = end;
  updates['/state'] = state;
  updates['/venue'] = venue;
  updates['/voteStart'] = voteStart;
  updates['/voteEnd'] = voteEnd;
  updates['/status'] = 'created';

  firebase.database().ref(`/meetups/${meetup.uid}`)
    .update(updates)
    .then(() => {
      dispatch({ type: EDIT_MEETUP_SUCCESS });
      Actions.meetups({ type: 'reset' });
    })
    .catch((err) => console.log(err));
  };
};

export const changeStatus = (meetup, status) => {
  console.log('change status to ', status);
  return (dispatch) => {
    firebase.database().ref(`/meetups/${meetup.uid}/status`)
      .set(status)
      .then(() => {
        console.log('set meetup');

        dispatch({
            type: MEETUP_CHANGED,
            prop: 'status',
            value: status });
      })
      .catch((err) => console.log(err));
    };
  };
