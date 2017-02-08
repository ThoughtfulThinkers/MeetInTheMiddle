import { Actions } from 'react-native-router-flux';
import { googleConfig } from '../envConfig';

/**************************************************
  Google
**************************************************/
// const GOOGLE_API_KEY = googleConfig.GOOGLE_API_KEY;
// export const reverseGeoLocLookup = (lat = '40.732287', lon: '-111.8996689') => dispatch => {
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&sensor=true&key=${GOOGLE_API_KEY}`
//   const url2 = `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.64177,-111.4946&key=${GOOGLE_API_KEY}`
//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       const address = data.results[0].formatted_address.split(',')
//       const location = address[len-3]
//       dispatch(fetchBreweryLocations(location))
//     })
//     .catch(error =>console.log('reverseGeoLocLookup Error: ', error))
