import {
  FETCH_MEETUPS,
  FETCH_MEETUPS_SUCCESS,
  FETCH_USER_MEETUPS,
  FETCH_USER_MEETUPS_SUCCESS,
  MEETUP_CREATE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  cityMeetups: {},
  userMeetups: {},
  cityLoading: true,
  userLoading: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MEETUPS:
      return { ...state, cityLoading: true };
    case FETCH_MEETUPS_SUCCESS:
      // console.log('in reducer', action.payload);
      return { ...state, cityMeetups: action.payload, cityLoading: false };
    case FETCH_USER_MEETUPS:
      return { ...state, userLoading: true };
    case FETCH_USER_MEETUPS_SUCCESS:
      return { ...state, userMeetups: action.payload, userLoading: false };
    default:
      return state;
  }
};
