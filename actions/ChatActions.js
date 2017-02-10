import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  FETCH_CHAT_MESSAGES_SUCCESS
} from './types';


export const fetchChatMessages = () => {
  // TODO: if not current user, send to login page
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase.database().ref('messages')
      .on('value', snapshot => {
        dispatch({ type: FETCH_CHAT_MESSAGES_SUCCESS, payload: snapshot.val() });
      });
  };
};
