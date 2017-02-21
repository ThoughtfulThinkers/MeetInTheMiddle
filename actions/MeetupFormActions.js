import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  MEETUP_CHANGED,
  ADD_MEETUP,
  ADD_MEETUP_SUCCESS,
  SET_CURRENT_MEETUP,
  EDIT_MEETUP,
  EDIT_MEETUP_SUCCESS,
  RESET_MEETUP
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
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    return Actions.login();
  }
  const meetup = {
    ...meetupDetails,
    chat: {},
    vote: {},
    users: {},
    location: '',
    status: 'created',
    user: currentUser.uid
  };
  firebase.database().ref('/meetups')
    .push(meetup)
    .then(({ key }) => {
      dispatch({ type: ADD_MEETUP_SUCCESS });
      meetup.uid = key;
      dispatch(setCurrentMeetup(meetup));
      Actions.meetup({ type: 'reset' });
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
  return (dispatch) => {
    firebase.database().ref(`/meetups/${meetup.uid}/status`)
      .set(status)
      .then(() => {
        dispatch({
            type: MEETUP_CHANGED,
            prop: 'status',
            value: status });
      })
      .then(() => {
        Actions.meetup({ type: 'refresh' });
      })
      .catch((err) => console.log(err));
    };
  };

  export const resetMeetup = () => {
    return {
      type: RESET_MEETUP
    };
  };

  export const deleteMeetup = (meetupId, users) => {
    return dispatch => {
      dispatch({ type: EDIT_MEETUP });
      const { currentUser } = firebase.auth();
      const removeUsers = users.map(user => {
        return firebase.database().ref(`/users/${user}/meetups/${meetupId}`).remove(error => {
          if (error) {
            console.log(error);
          }
        });
      });
      Promise.all(removeUsers)
      .then(() => {
        firebase.database().ref(`/meetups/${meetupId}`).remove((error) => {
          if (error) {
            console.log(error);
          } else {
            dispatch({ type: RESET_MEETUP });
          }
        });
      });
    };
  };
