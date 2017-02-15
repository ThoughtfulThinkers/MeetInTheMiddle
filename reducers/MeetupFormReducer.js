import moment from 'moment';
import {
  MEETUP_CHANGED,
  ADD_MEETUP,
  ADD_MEETUP_SUCCESS,
  SET_CURRENT_MEETUP,
  EDIT_MEETUP,
  EDIT_MEETUP_SUCCESS,
  CREATE_VOTING_SUCCESS,
  SET_VOTE,
  RESET_MEETUP
} from '../actions/types';

const now = moment().format('YYYY-MM-DD HH:mm');
const INITIAL_STATE = {
  name: '',
  description: '',
  start: now,
  end: now,
  state: 'New York',
  venue: { name: 'Coffee Shop', id: '4bf58dd8d48988d1e0931735' },
  venues: {},
  status: 'created',
  location: '',
  voteStart: now,
  voteEnd: now
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MEETUP_CHANGED:
      return { ...state, [action.prop]: action.value };
    case ADD_MEETUP:
      return { ...state, loading: true };
    case ADD_MEETUP_SUCCESS:
      return INITIAL_STATE;
    case SET_CURRENT_MEETUP:
      return { ...state, ...action.meetup };
    case EDIT_MEETUP:
      return { ...state, loading: true };
    case EDIT_MEETUP_SUCCESS:
      return INITIAL_STATE;
    case SET_VOTE: {
      const venue = state.venues[action.venueId];
      venue.votes = action.vote;
      const venues = { ...state.venues, venue };
      return { ...state, venues };
    }
    case RESET_MEETUP:
      return INITIAL_STATE;
    default:
      return state;
  }
};
