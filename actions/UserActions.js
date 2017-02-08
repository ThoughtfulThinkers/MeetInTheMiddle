import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  FETCH_USER_SUCESS,
  USER_INPUT_UPDATE,
} from './types';

/********************************************
  Form Actions
*********************************************/

export const userInputUpdate = ({ prop, value }) => ({
  type: USER_INPUT_UPDATE,
  payload: { prop, value }
});

/********************************************
  Firebase Actions
********************************************/

export const createUser = () => dispatch => {
  const { currentUser } = firebase.auth();
  console.log(`currentUser: ${currentUser}`);
};
