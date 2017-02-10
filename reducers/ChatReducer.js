import {
  FETCH_MESSAGES_BY_MEETUP_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  messages: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MESSAGES_BY_MEETUP_SUCCESS:
      return { ...state, messages: action.payload };
    default:
      return state;
  }
};
