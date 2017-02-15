import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import 'whatwg-fetch';
import { googlePlacesConfig } from '../envConfig';

import {
  CREATE_USER_SUCCESS,
  FETCH_USER_SUCESS,
  FETCH_GEOLOCATION_BY_FULL_ADDRESS_SUCCESS,
  GET_CURRENT_USER,
  SET_CURRENT_USER,
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
  User Data Actions
*********************************************/

export const getCurrentUser = () => ({
  type: GET_CURRENT_USER
});

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: user
});

/********************************************
  Firebase Actions
********************************************/

export const updateUser = data => {
  return dispatch => {
    const { currentUser } = firebase.auth();
    const { street, city, state, zipcode, firstName, lastName, image } = data;
    const fullAddress = `${street},${city},${state}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${GOOGLE_API}`;
    fetch(url)
    .then(response => response.json())
      .then(data => {
        // console.log('location: ', data.results[0].geometry.location);
        let userData = {};
        // const latLon = data.results[0].geometry.location;
        // let location = { lat: latLon.lat, lon: latLon.lng };
        const lat = data.results[0].geometry.location.lat;
        const lon = data.results[0].geometry.location.lng;
        let location = { lat, lon };
        if (state.length > 0) location = { ...location, street, city, state, zipcode }; // state required at minimum
        userData = { ...userData, location };
        // Firebase doesn't allow empty documents on an update
        if (firstName.length > 0) userData = { ...userData, firstName };
        if (lastName.length > 0) userData = { ...userData, lastName };
        if (image.length > 0) userData = { ...userData, image };
        console.log('userData ', userData);
        dispatch({ type: FETCH_GEOLOCATION_BY_FULL_ADDRESS_SUCCESS, payload: location });
        firebase.database().ref(`/users/${currentUser.uid}`)
          .update(userData)
          .then(response => Actions.meetups({ type: 'reset' }))
          .catch(error => console.log('updateUser Error: ', error));
      })
      .catch(error => console.log('fetchGeoLocationByFullAddress error: ', error.message));
  };
};



export const createNewUser = newUserData => {
  return dispatch => {
    const { currentUser } = firebase.auth();
    const { street, city, state, zipcode, firstName, lastName } = newUserData;
    const fullAddress = `${street},${city},${state}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${GOOGLE_API}`;
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
        console.log(`userData: ${userData}`);
        dispatch({ type: FETCH_GEOLOCATION_BY_FULL_ADDRESS_SUCCESS, payload: location });
        dispatch(() => setNewUser(dispatch, userData));
      })
      .catch(error => console.log('fetchGeoLocationByFullAddress error: ', error.message));
  };
};

export const setNewUser = (dispatch, userData) => {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}`)
    .set(userData)
    .then(() => Actions.meetups({ type: 'reset' }))
    .catch(error => console.log(error));
};

/**************************************************
Google
**************************************************/
// const GOOGLE_PLACES_API = googlePlacesConfig.apiKey;
const GOOGLE_API = 'AIzaSyDzk0eKI5tnKWkSORpDTL32iZ15QjxQxeg';
export const fetchGeoLocationByFullAddress = (street, city, state) => dispatch => {
  console.log('google api: ', GOOGLE_API);
  const fullAddress = `${street},${city},${state}`;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${GOOGLE_API}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    // console.log('location: ', data.results[0].geometry.location);
    const location = data.results[0].geometry.location;
    dispatch({ type: FETCH_GEOLOCATION_BY_FULL_ADDRESS_SUCCESS, payload: location });
  })
  .catch(error => console.log('fetchGeoLocationByFullAddress error: ', error));
};
