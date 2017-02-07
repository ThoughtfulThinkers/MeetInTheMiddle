import {
  FETCH_MEETUPS_SUCCESS,
  FETCH_USER_MEETUPS_SUCCESS,
  MEETUP_CREATE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  cityMeetups: {},
  userMeetups: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MEETUPS_SUCCESS:
      console.log('in reducer', action.payload);
      return { ...state, cityMeetups: action.payload };
    default:
      return state;
  }
};
