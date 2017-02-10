import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { fbConfig } from '../envConfig';

import {
  FETCH_MESSAGES_BY_MEETUP_SUCCESS
} from './types';


export const fetchMessagesByMeetup = id => {
  // TODO: if not current user, send to login page
  // console.log('room id ', id)
  const { currentUser } = firebase.auth();
  return dispatch => {
    const messages = firebase.database().ref(`/chatrooms/${id}`);
    messages.on('value', snapshot => {
        // console.log('snap.val ', snapshot.val())
        dispatch({ type: FETCH_MESSAGES_BY_MEETUP_SUCCESS, payload: snapshot.val() });
      });
    messages.off();
  };
};

// export const addMessageByMeetup = (id, msg) => {
//   const { currentUser } = firebase.auth();
//
//   return dispatch => {
//     firebase.database.ref(`/chatrooms/${id}`)
//       .set(msg)
//       .then(({ key }) => {
//         console.log('message added', key);
//       });
//   };
// };
