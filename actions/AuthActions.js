import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  FETCH_GEOLOCATION_BY_FULL_ADDRESS_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOAD_AUTHENTICATED_USER_STATE_SUCCESS,
  SET_LOGIN_STATUS,
  PASSWORD_CHANGED,
} from './types';

import { googlePlacesConfig, GOOGLE_GEO_API_KEY } from '../envConfig';

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
    setLoginStatus is used to cofirm a user's login status
    by app components.  This is especially useful when
    accessing a screen that requires a user be logged in.
*****************************************************************/
export const setLoginStatus = status => {
  return {
    type: SET_LOGIN_STATUS,
    payload: status
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        loginUserSuccess(dispatch, user);
        dispatch(loadAuthenticatedUserState());
        return user;
      })
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
    .then(() => Actions.meetups({ type: 'reset' }))
    .catch(error => console.log('Sign Out Error ', error));
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
  Actions.login({ type: 'reset' });
};

/*****************************************************************
  Manage User
  loadAuthenticatedUserState is used both in the physical login
  process and to keep the user state between app restarts
*****************************************************************/

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

    Creating a new user account is a three step process:
    1. Create the user account in FB
    2. Get the user's latitude & logitude from Google based on
       their prefered location address
    2. Create a user profile (e.g. name, location) in FB
*****************************************************************/

export const createNewUserAccount = userProfileData => dispatch => {
  const { email, password } = userProfileData;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      let newUserData = userProfileData;
      newUserData = { ...newUserData, uid: user.uid };
      createNewUserProfile(dispatch, newUserData);
    })
    .catch(() => loginUserFail(dispatch));
};

const createNewUserProfile = (dispatch, newUserData) => {
    const { currentUser } = firebase.auth();
    const { street, city, state, zipcode, firstName, lastName } = newUserData;
    const fullAddress = `${street},${city},${state}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${GOOGLE_GEO_API_KEY}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const lat = data.results[0].geometry.location.lat;
        const lon = data.results[0].geometry.location.lng;
        const location = { lat, lon, street, city, state, zipcode };
        const userData = {
          uid: currentUser.uid,
          firstName,
          lastName,
          location
        };
        dispatch({ type: FETCH_GEOLOCATION_BY_FULL_ADDRESS_SUCCESS, payload: location });
        dispatch(() => setNewUser(dispatch, userData));
      })
      .catch(error => console.log('fetchGeoLocationByFullAddress error: ', error.message));
  // };
};

export const setNewUser = (dispatch, userData) => {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}`)
    .set(userData)
    .then(() => Actions.meetups({ type: 'reset' }))
    .catch(error => console.log(error));
};

/*****************************************************************
    Update User Account
*****************************************************************/
// TODO: move updateUser Account from UserActions.js

// TODO: Change email and password

// TODO: Send password reset email

// TODO: Authenticate Email address

// TODO: Add displayName and photoURL w/i user auth
