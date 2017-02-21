import {
  CREATE_USER_SUCCESS,
  FETCH_GEOLOCATION_BY_FULL_ADDRESS_SUCCESS,
  GENERATE_ERROR_MESSAGE,
  LOAD_AUTHENTICATED_USER_STATE_SUCCESS,
  RESET_ERROR_STATE,
  USER_INPUT_CHANGED,
  USER_LOCATION_INPUT_CHANGED,
  UPDATE_USER_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  image: '',
  meetups: {},
  location: {
    street: '',
    city: '',
    zipcode: '',
    state: '',
    lon: '',
    lat: '',
  },
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case CREATE_USER_SUCCESS:
      return state;

    case FETCH_GEOLOCATION_BY_FULL_ADDRESS_SUCCESS: {
      const lat = action.payload.lat;
      const lon = action.payload.lon;
      const location = { ...state.location, lon, lat };
      return { ...state, location };
    }

    case LOAD_AUTHENTICATED_USER_STATE_SUCCESS:
      return { ...state, ...action.payload };

    case RESET_ERROR_STATE:
      return { ...state, error: '' };

    case USER_INPUT_CHANGED: {
      // example: action.payload = {prop: 'name', value: 'Will Smith'}
      // key interpolation -> [prop]
      const { prop, value } = action.payload;
      return { ...state, [prop]: value };
    }

    case USER_LOCATION_INPUT_CHANGED: {
      const { prop, value } = action.payload;
      const location = { ...state.location, [prop]: value };
      return { ...state, location };
    }

    case UPDATE_USER_SUCCESS:
      return state;

    default: {
      return state;
    }
  }
};
