import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  FETCH_USER_SUCESS,
  USER_INPUT_CHANGED,
  USER_LOCATION_INPUT_CHANGED
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

export const createUser = () => dispatch => {
  const { currentUser } = firebase.auth();
  console.log(`currentUser: ${currentUser}`);
};
