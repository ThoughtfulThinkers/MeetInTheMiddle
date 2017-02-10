import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import 'whatwg-fetch';
import { googlePlacesConfig } from '../envConfig';

import {
  CREATE_USER_SUCCESS,
  FETCH_USER_SUCESS,
  FETCH_GEOLOCATION_BY_FULL_ADDRESS_SUCCESS,
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
  const { firstName, lastName, image, meetups, location } = data;
  const userData = { uid: currentUser.uid, firstName, lastName, image, meetups, location };
  const { street, city, state } = location;
  return dispatch => {
    // dispatch(fetchGeoLocationByFullAddress(street, city, state))
    //   .then(() => {
        firebase.database().ref(`/users/${currentUser.uid}`)
          .set(userData)
          .then(({ key }) => {
            console.log('user created: ', key);
            dispatch({ type: CREATE_USER_SUCCESS, payload: key });
          })
          .catch(error => console.log(error));
      // });
  };
};

export const updateUser = data => {
  const { currentUser } = firebase.auth();
  // console.log('currentUser', currentUser);
  const { firstName, lastName, image, location } = data;
  const userData = { firstName, lastName, image, location };
  const { street, city, state } = location;
  return dispatch => {
    // dispatch(fetchGeoLocationByFullAddress(street, city, state))
    //   .then(() => {
        firebase.database().ref(`/users/${currentUser.uid}`)
          .update(userData)
          .then(response => {
            dispatch({ type: UPDATE_USER_SUCCESS });
            Actions.meetups({ type: 'reset' });
          })
          .catch(error => console.log('updateUser Error: ', error));
    // });
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
