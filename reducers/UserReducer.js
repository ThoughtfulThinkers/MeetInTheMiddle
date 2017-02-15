import {
  CREATE_USER_SUCCESS,
  FETCH_GEOLOCATION_BY_FULL_ADDRESS_SUCCESS,
  FETCH_USER_SUCCESS,
  GET_CURRENT_USER,
  LOAD_AUTHENTICATED_USER_STATE_SUCCESS,
  SET_CURRENT_USER,
  USER_INPUT_CHANGED,
  USER_LOCATION_INPUT_CHANGED,
  UPDATE_USER_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  image: ' ',
  meetups: {},
  location: {
    street: ' ',
    city: ' ',
    zipcode: ' ',
    lon: '',
    lat: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      const { firstName, lastName } = action.payload;
      return { ...state, firstName, lastName };
    }

    case LOAD_AUTHENTICATED_USER_STATE_SUCCESS: {
      const { firstName, lastName, image, meetups, location } = action.payload;
      return { ...state, firstName, lastName, image, meetups, location };
    }

    case CREATE_USER_SUCCESS: {
      return state;
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
      const lon = action.payload.lon;
      const location = { ...state.location, lon, lat };
      return { ...state, location };
    }

    case UPDATE_USER_SUCCESS: {
      // console.log('UPDATE_USER_SUCCESS payload: ', action.payload);
      return state;
    }

    default:
      return state;

  }
};
