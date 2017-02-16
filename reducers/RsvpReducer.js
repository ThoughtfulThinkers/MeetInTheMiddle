import {
  CHANGE_RSVP,
  SET_RSVP,
  SET_RSVP_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  lat: 0,
  lon: 0,
  address: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_RSVP:
      return { ...state, lat: action.lat, lon: action.lon, address: action.address };
    case SET_RSVP:
      return { ...state, loading: true };
    case SET_RSVP_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
