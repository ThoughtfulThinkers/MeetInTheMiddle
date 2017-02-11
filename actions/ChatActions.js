import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { fbConfig } from '../envConfig';

import {
  FETCH_MESSAGES_BY_MEETUP_SUCCESS
} from './types';


export const sendMessageByMeetup = (id, message) => {
  // TODO: Check currentUser status
  const { currentUser } = firebase.auth();
  console.log('sendMessageByMeetup', message);
  const { text, user } = message[0];
  const createdAt = firebase.database.ServerValue.TIMESTAMP;
  return dispatch => {
    firebase.database().ref(`/chatrooms/${id}`)
      .push({
        createdAt,
        text,
        user
      })
      .then(() => console.log('message added'))
      .catch(error => console.log(error));
  };
};

export const fetchMessagesByMeetup = id => {
  // TODO: if not current user, send to login page
  // console.log('room id ', id)
  const { currentUser } = firebase.auth();
  return dispatch => {
    const messages = firebase.database().ref(`/chatrooms/${id}`).limitToLast(50);
    messages.on('child_added', snapshot => {
      // console.log('snap.val ', snapshot.val());
      dispatch({ type: FETCH_MESSAGES_BY_MEETUP_SUCCESS, payload: snapshot.val() });
    });
  };
};
