import {
  MEETUP_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  description: '',
  start: '2017-05-05 20:00',
  end: '2017-05-05 22:00'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MEETUP_CHANGED:
      return { ...state, [action.prop]: action.value };
    default:
      return state;
  }
};
