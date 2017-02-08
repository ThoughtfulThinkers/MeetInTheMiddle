import {
  FETCH_USER_SUCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  image: '',
  meeetups: {},
  location: {
    street: '',
    city: '',
    zipcode: '',
    lon: '',
    lat: '',
  },
};

export default (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return { ...state, action.payload }
    default:
      return state;

  }
}
