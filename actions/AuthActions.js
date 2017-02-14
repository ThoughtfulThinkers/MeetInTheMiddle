import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  CREATE_NEW_USER_ACCOUNT_SUCCESS,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOAD_AUTHENTICATED_USER_STATE_SUCCESS
} from './types';

/*****************************************************************
  Changes to form Input fields
*****************************************************************/

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

/*****************************************************************
    Access Actions
*****************************************************************/

export const loginUser = ({ email, password }) => {
  // console.log(`Login User email: ${email} password: ${password}`);
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        // console.log('sign in: ', user);
        loginUserSuccess(dispatch, user);
        dispatch(loadAuthenticatedUserState());
        return user;
      })
      // .then(user => Actions.profileUpdate(user))
      .then(() => Actions.meetups({ type: 'reset' }))
      .catch((error) => {
        console.log(error);
      });
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

export const logoutUser = () => dispatch => {
  firebase.auth().signOut()
    .then(() => Actions.meetups())
    .catch(error => console.log('Sign Out Error ', error));
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
  Actions.login({ type: 'reset' });
};

export const loadAuthenticatedUserState = () => dispatch => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    dispatch({ type: LOAD_AUTHENTICATED_USER_STATE_SUCCESS, payload: {} });
  }
  firebase.database().ref(`/users/${currentUser.uid}`)
    .on('value', (snapshot) => {
      dispatch({ type: LOAD_AUTHENTICATED_USER_STATE_SUCCESS, payload: snapshot.val() });
    });
};

/*****************************************************************
    Create New User Account
*****************************************************************/

export const createNewUserAccount = ({ email, password }) => dispatch => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      // console.log('create user: ', user);
      createNewUserAccountSuccess(dispatch, user, email, password);
    })
    .catch(() => loginUserFail(dispatch));
};

const createNewUserAccountSuccess = (dispatch, user, email, password) => {
  dispatch({
    type: CREATE_NEW_USER_ACCOUNT_SUCCESS,
    payload: { user, email, password }
  });
  Actions.profileCreate();
};

/*****************************************************************
    Modify User Account
*****************************************************************/
