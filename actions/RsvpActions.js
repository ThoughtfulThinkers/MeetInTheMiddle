import {
  CHANGE_RSVP,
  SET_RSVP,
  SET_RSVP_SUCCESS
} from '../actions/types';

export const changeRSVP = (street, lat, lon) => {
  return {
    type: CHANGE_RSVP,
    street,
    lat,
    lon
  };
};

export const setRsvp = (street, lat, lon, meetupId) => {
  return (dispatch) => {
    dispatch({ type: SET_RSVP });
    console.log(street, lat, lon);
  };
};
