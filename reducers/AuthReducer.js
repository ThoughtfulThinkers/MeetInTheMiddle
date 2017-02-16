import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
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
    default:
      return state;
  }
};
