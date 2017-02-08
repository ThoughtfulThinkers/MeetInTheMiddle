import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ChatReducer from './ChatReducer';
import MeetupReducer from './MeetupReducer';
import UserReducer from './UserReducer';
import FilterReducer from './FilterReducer';
import MeetupFormReducer from './MeetupFormReducer';

export default combineReducers({
// replace with actual reducer
  auth: AuthReducer,
  chat: ChatReducer,
  meetups: MeetupReducer,
  user: UserReducer,
  filter: FilterReducer,
  meetupForm: MeetupFormReducer
});
