import {
  MEETUP_CHANGED,
  ADD_MEETUP,
  ADD_MEETUP_SUCCESS,
  SET_CURRENT_MEETUP,
  EDIT_MEETUP,
  EDIT_MEETUP_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  description: '',
  start: '2017-02-20 15:00',
  end: '2017-02-20 17:00',
  state: 'New York',
  venue: { name: 'Coffee Shop', id: '4bf58dd8d48988d1e0931735' },
  voteStart: '2017-02-13 20:00',
  voteEnd: '2017-02-19 20:00'
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
    default:
      return state;
  }
};
