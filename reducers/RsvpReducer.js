import {
  CHANGE_RSVP,
  SET_RSVP,
  SET_RSVP_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  street: '123 Main Street',
  lat: 0,
  lon: 0
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case CHANGE_RSVP:
      return { ...state, street: action.street, lat: action.lat, lon: action.lon };
    case SET_RSVP:
      return { ...state, loading: true };
    case SET_RSVP_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
