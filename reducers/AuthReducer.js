import {
  EMAIL_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  PASSWORD_CHANGED,
  PASSWORD_RESET_FAILED,
  RESET_AUTH_ERROR_STATE,
  SET_LOGIN_STATUS,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  loggedIn: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS: {
      return { ...state, loggedIn: action.payload };
    }
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case LOGIN_USER:
      console.log('LOGIN_USER REDUCER: ', action.payload);
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case PASSWORD_RESET_FAILED:
      return { ...state, error: 'Email Address Invalid or Account does not exist' };
    case RESET_AUTH_ERROR_STATE:
      return { ...state, error: '' };
    default:
      return state;
  }
};
