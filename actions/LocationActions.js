import { Actions } from 'react-native-router-flux';
import 'whatwg-fetch';
import { googlePlacesConfig } from '../envConfig';

import {
  FETCH_GEOLOCATION_BY_FULL_ADDRESS_SUCCESS
} from './types';

/**************************************************
  Google
**************************************************/
// const GOOGLE_PLACES_API = googlePlacesConfig.apiKey;
const GOOGLE_API = 'AIzaSyDzk0eKI5tnKWkSORpDTL32iZ15QjxQxeg';
export const fetchGeoLocationByFullAddress = (street, city, state) => dispatch => {
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
