import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  CREATE_USER_SUCCESS,
  FETCH_USER_SUCESS,
  USER_INPUT_CHANGED,
  USER_LOCATION_INPUT_CHANGED,
  UPDATE_USER_SUCCESS,
} from './types';

/********************************************
  Form Actions
*********************************************/

export const userInputChanged = ({ prop, value }) => ({
  type: USER_INPUT_CHANGED,
  payload: { prop, value }
});

export const userLocationInputChanged = ({ prop, value }) => ({
  type: USER_LOCATION_INPUT_CHANGED,
  payload: { prop, value }
});

/********************************************
  Firebase Actions
********************************************/

export const createUser = data => {
  const { currentUser } = firebase.auth();
  console.log('currentUser', currentUser);
  const { firstName, lastName, image, meetups, location, email, password } = data;
  const userData = { uid: currentUser.uid, firstName, lastName, image, meetups, location };
  const emailData = { email, password };
  return dispatch => {
    firebase.database().ref(`/users/${currentUser.uid}`)
      .set(userData)
      .then(({ key }) => {
        console.log('user created: ', key);
        dispatch({ type: CREATE_USER_SUCCESS, payload: key });
      })
      .catch(error => console.log(error));
  };
};

export const updateUser = data => {
  const { currentUser } = firebase.auth();
  // console.log('currentUser', currentUser);
  const { firstName, lastName, image, location } = data;
  const userData = { firstName, lastName, image, location };
  return dispatch => {
    firebase.database().ref(`/users/${currentUser.uid}`)
      .update(userData)
      .then(response => {
        dispatch({ type: UPDATE_USER_SUCCESS });
        Actions.meetups();
      })
      .catch(error => console.log('updateUser Error: ', error));
  };
};
