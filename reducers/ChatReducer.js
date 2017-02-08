import {
  FETCH_CHAT_MESSAGES_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  messages: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CHAT_MESSAGES_SUCCESS:
      // console.log(action.payload);
      return { ...state, messages: action.payload };
    default:
      return state;
  }
};
