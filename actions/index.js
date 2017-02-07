import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  USER_MEETUPS_FETCH_SUCCESS
 } from './types';

 export const userMeetupsFetch = () => {
   const { currentUser } = firebase.auth();

   return (dispatch) => {
     firebase.database().ref(`/users/${currentUser.uid}/employees`)
       .on('value', snapshot => {
         dispatch({ type: USER_MEETUPS_FETCH_SUCCESS, payload: snapshot.val() });
       });
   };
 };
