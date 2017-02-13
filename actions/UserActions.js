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
    const { street, city, state, firstName, lastName, image } = data;
    const fullAddress = `${street},${city},${state}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${GOOGLE_API}`;
    fetch(url)
    .then(response => response.json())
      .then(data => {
        // console.log('location: ', data.results[0].geometry.location);
        let userData = {};
        const latLon = data.results[0].geometry.location;
        let location = { lat: latLon.lat, lon: latLon.lng };
        if (state.length > 0) location = { ...location, street, city, state }; // state required at minimum
        userData = { ...userData, location };
        // Firebase doesn't allow empty documents on an update
        if (firstName.length > 0) userData = { ...userData, firstName };
        if (lastName.length > 0) userData = { ...userData, lastName };
        if (image.length > 0) userData = { ...userData, image };

        console.log('userData ', userData);
        dispatch({ type: FETCH_GEOLOCATION_BY_FULL_ADDRESS_SUCCESS, payload: location });
        firebase.database().ref(`/users/${currentUser.uid}`)
          .update(userData)
          .then(response => Actions.meetups())
          .catch(error => console.log('updateUser Error: ', error));
      })
      .catch(error => console.log('fetchGeoLocationByFullAddress error: ', error));
  };
};



export const createNewUser = data => {
  return dispatch => {
    const { street, city, state, firstName, lastName, image, meetups } = data;
    const { currentUser } = firebase.auth();
    const fullAddress = `${street},${city},${state}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${GOOGLE_API}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const latLon = data.results[0].geometry.location;
        const location = { lat: latLon.lat, lon: latLon.lng, street, city, state };
        const userData = {
          uid: currentUser.uid,
          firstName,
          lastName,
          image,
          meetups,
          location
        };
        dispatch({ type: FETCH_GEOLOCATION_BY_FULL_ADDRESS_SUCCESS, payload: location });
        firebase.database().ref(`/users/${currentUser.uid}`)
          .set(userData)
          .then(() => Actions.meetups({ type: 'reset' }))
          .catch(error => console.log(error));
      })
      .catch(error => console.log('fetchGeoLocationByFullAddress error: ', error));
  };
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
