import {
  FETCH_USER_SUCCESS,
  USER_INPUT_CHANGED,
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
    
    case USER_INPUT_CHANGED: {
      // example: action.payload = {prop: 'name', value: 'Will Smith'}
      // key interpolation -> [prop]
      const { prop, value } = action.payload;
      console.log(`USER_INPUT_CHANGED: ${prop}: ${value}`);
      return { ...state, [prop]: value };
    }

    // case USER_LOCATION_INPUT_CHANGED: {
    //   const { prop, value } = action.payload;
    //   console.log(`USER_INPUT_CHANGED: ${prop}: ${value}`);
    //   return { ...state, [prop]: value };
    // }


    case FETCH_USER_SUCCESS: {
      return { ...state, user: action.payload };
    }

    default:
      return state;

  }
};
