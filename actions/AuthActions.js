import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  CREATE_NEW_USER_ACCOUNT_SUCCESS,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  // console.log(`Login User email: ${email} password: ${password}`);
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('sign in: ', user);
        loginUserSuccess(dispatch, user);
      })
      .catch((error) => {
        console.log(error);

        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //   .then(user => {
        //     console.log('create user: ', user);
        //     loginUserSuccess(dispatch, user);
        //   })
        //   .catch(() => loginUserFail(dispatch));
      });
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.meetups();
};

export const logoutUser = () => dispatch => {
  firebase.auth().signOut()
    .then(() => console.log('Signed Out'))
    .catch(error => console.log('Sign Out Error ', error));
};

export const createNewUserAccount = ({ email, password }) => dispatch => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      console.log('create user: ', user);
      createNewUserAccountSuccess(dispatch, user, email, password);
    })
    .catch(() => loginUserFail(dispatch));
};

const createNewUserAccountSuccess = (dispatch, user, email, password) => {
  dispatch({
    type: CREATE_NEW_USER_ACCOUNT_SUCCESS,
    payload: { user, email, password }
  });
  Actions.profileForm();
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};
