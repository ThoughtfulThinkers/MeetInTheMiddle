import {
  MEETUP_CHANGED,
  ADD_MEETUP,
  ADD_MEETUP_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  description: '',
  start: '2017-01-01 20:00',
  end: '2017-01-01 22:00',
  state: '',
  venue: '',
  voteStart: '2017-01-01 22:00',
  voteEnd: '2017-01-01 22:00'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MEETUP_CHANGED:
      return { ...state, [action.prop]: action.value };
    case ADD_MEETUP:
      return { ...state, loading: true };
    case ADD_MEETUP_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
