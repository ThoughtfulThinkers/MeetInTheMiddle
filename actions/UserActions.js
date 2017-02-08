import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  FETCH_USER_SUCESS,
} from './types';

export const createUser = () => dispatch => {
  const { currentUser } = firebase.auth();
  console.log(`currentUser: ${currentUser}`);
};
