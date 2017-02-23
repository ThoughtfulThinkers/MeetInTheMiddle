import {
  FETCH_MEETUPS,
  FETCH_MEETUPS_SUCCESS,
  FETCH_USER_MEETUPS,
  FETCH_USER_MEETUPS_SUCCESS,
  DELETE_RSVP_SUCCESS,
  FETCH_SEARCH_MEETUPS,
  FETCH_SEARCH_MEETUPS_SUCCESS,
  CHANGE_SEARCH,
} from '../actions/types';

const INITIAL_STATE = {
  cityMeetups: {},
  userMeetups: {},
  cityLoading: true,
  userLoading: true,
  searchMeetups: {},
  searchLoading: false,
  search: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MEETUPS:
      return { ...state, cityLoading: true };
    case FETCH_MEETUPS_SUCCESS:
      return { ...state, cityMeetups: action.payload, cityLoading: false };
    case FETCH_USER_MEETUPS:
      return { ...state, userLoading: true };
    case FETCH_USER_MEETUPS_SUCCESS:
      return { ...state, userMeetups: action.payload, userLoading: false };
    case DELETE_RSVP_SUCCESS:
      return { ...state, userMeetups: { ...state.userMeetups, [action.id]: action.meetup } };
    case CHANGE_SEARCH:
      return { ...state, search: action.search };
    case FETCH_SEARCH_MEETUPS:
      return { ...state, searchLoading: true };
    case FETCH_SEARCH_MEETUPS_SUCCESS:
      return { ...state, searchMeetups: action.payload, searchLoading: false, search: '' };
    default:
      return state;
  }
};
