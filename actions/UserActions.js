import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import 'whatwg-fetch';
import { googlePlacesConfig, GOOGLE_GEO_API_KEY } from '../envConfig';

import {
  FETCH_GEOLOCATION_BY_FULL_ADDRESS_SUCCESS,
  USER_INPUT_CHANGED,
  USER_LOCATION_INPUT_CHANGED,
  UPDATE_USER_SUCCESS,
} from './types';

/*
Code to hold for a moment
FETCH_USER_SUCESS,
GET_CURRENT_USER,
SET_CURRENT_USER,
*/

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

export const updateUser = data => {
  return dispatch => {
    const { currentUser } = firebase.auth();
    const { street, city, state, zipcode, firstName, lastName, image } = data;
    const fullAddress = `${street},${city},${state}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${GOOGLE_GEO_API_KEY}`;
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
