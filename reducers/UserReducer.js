import {
  FETCH_USER_SUCCESS,
  USER_INPUT_UPDATE,
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
    lon: '',
    lat: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_INPUT_UPDATE: {
      // example: action.payload = {prop: 'name', value: 'Will Smith'}
      // key interpolation -> [prop]
      const { prop, value } = action.payload;
      return { ...state, [prop]: value };
    }

    case FETCH_USER_SUCCESS: {
      return { ...state, user: action.payload };
    }

    default:
      return state;

  }
};
