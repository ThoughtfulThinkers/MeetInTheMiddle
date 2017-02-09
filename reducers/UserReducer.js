import {
  CREATE_USER_SUCCESS,
  FETCH_GEOLOCATION_BY_FULL_ADDRESS_SUCCESS,
  FETCH_USER_SUCCESS,
  USER_INPUT_CHANGED,
  USER_LOCATION_INPUT_CHANGED,
  UPDATE_USER_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  uid: '',
  userKey: '',
  firstName: '',
  lastName: '',
  image: '',
  meetups: {},
  location: {
    street: '',
    city: '',
    zipcode: '',
    lon: '',
    lat: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case CREATE_USER_SUCCESS: {
      console.log('userKey:', action.payload);
      return { ...state, userKey: action.payload };
    }

    case USER_INPUT_CHANGED: {
      // example: action.payload = {prop: 'name', value: 'Will Smith'}
      // key interpolation -> [prop]
      const { prop, value } = action.payload;
      // console.log(`USER_INPUT_CHANGED: ${prop}: ${value}`);
      return { ...state, [prop]: value };
    }

    case USER_LOCATION_INPUT_CHANGED: {
      const { prop, value } = action.payload;
      const location = { ...state.location, [prop]: value };
      // console.log('USER_LOCATION_INPUT_CHANGED: ', location);
      return { ...state, location };
    }


    case FETCH_USER_SUCCESS: {
      return { ...state, user: action.payload };
    }

    case FETCH_GEOLOCATION_BY_FULL_ADDRESS_SUCCESS: {
      const lat = action.payload.lat;
      const lon = action.payload.lng;
      const location = { ...state.locaiton, lon, lat };
      return { ...state, location };
    }

    case UPDATE_USER_SUCCESS: {
      console.log('UPDATE_USER_SUCCESS payload: ', action.payload);
      return state;
    }

    default:
      return state;

  }
};
