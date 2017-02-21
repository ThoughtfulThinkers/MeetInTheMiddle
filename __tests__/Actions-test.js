import 'react-native';
import * as actions from '../actions';

/******************************************************
Auth Actions
******************************************************/

/******************************************************
Chat Actions
******************************************************/

/******************************************************
Filter Actions
******************************************************/
it('creates a SET_TEXT action', () => {
  expect(actions.setText('Penn')).toMatchSnapshot();
});

it('creates a SET_LOCATION action', () => {
  expect(actions.setLocation('Pennsylvania')).toMatchSnapshot();
});

/******************************************************
Location Actions
******************************************************/

/******************************************************
  Map Actions
******************************************************/
  //NA, all asynch

/******************************************************
  Meetup Actions
******************************************************/
 //NA, all asynch

/******************************************************
  Meetup Form Actions
******************************************************/
it('creates a MEETUP_CHANGED action', () => {
  expect(actions.meetupChange('state', 'Pennsylvania')).toMatchSnapshot();
});

it('creates a SET_CURRENT_MEETUP action', () => {
  expect(actions.setCurrentMeetup({ name: 'meetup', description: 'meetup' })).toMatchSnapshot();
});

it('creates a RESET_MEETUP action', () => {
  expect(actions.resetMeetup()).toMatchSnapshot();
});

/******************************************************
RSVP Actions
******************************************************/
  //NA, all asynch

/******************************************************
  User Actions
******************************************************/
