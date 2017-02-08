import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ChatReducer from './ChatReducer';
import MeetupReducer from './MeetupReducer';

export default combineReducers({
// replace with actual reducer
  auth: AuthReducer,
  meetups: MeetupReducer,
  chat: ChatReducer,
});
