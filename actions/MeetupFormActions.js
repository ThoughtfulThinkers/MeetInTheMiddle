import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  MEETUP_CHANGED,
  ADD_MEETUP,
  ADD_MEETUP_SUCCESS
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
    location: ''
  };
  firebase.database().ref('/meetups')
    .push(meetup)
    .then(({ key }) => {
      // console.log('created meetup: ', key);
      dispatch({ type: ADD_MEETUP_SUCCESS });
      Actions.meetup({ type: 'reset', id: key });
    })
    .catch((err) => console.log(err));
  };
};
