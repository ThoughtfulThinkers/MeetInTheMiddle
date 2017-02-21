import 'react-native';
import * as actions from '../actions';

/******************************************************
Auth Actions
******************************************************/
it('inputs EMAIL_CHANGED', () => {
  expect(actions.emailChanged('user@test.com')).toMatchSnapshot();
});

it('inputs PASSWORD_CHANGED', () => {
  expect(actions.passwordChanged('1NewUser')).toMatchSnapshot();
});

it('inputs AUTH_INPUT_CHANGED', () => {
  expect(actions.authInputChanged({ prop: 'newPassword', value: 'test' })).toMatchSnapshot();
});

it('inputs AUTH_INPUT_CHANGED', () => {
  expect(actions.authInputChanged({ prop: 'confirmPassword', value: 'test' })).toMatchSnapshot();
});

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
it('creates a USER_INPUT_CHANGED action', () => {
  expect(actions.userInputChanged({ prop: 'firstName', value: 'John' })).toMatchSnapshot();
});

it('creates a USER_INPUT_CHANGED action', () => {
  expect(actions.userInputChanged({ prop: 'lastName', value: 'Smith' })).toMatchSnapshot();
});

it('creates a USER_LOCATION_INPUT_CHANGED action', () => {
  expect(actions.userLocationInputChanged({ prop: 'street', value: '123 Main St' })).toMatchSnapshot();
});

it('creates a USER_LOCATION_INPUT_CHANGED action', () => {
  expect(actions.userLocationInputChanged({ prop: 'city', value: 'Salt Lake City' })).toMatchSnapshot();
});

it('creates a USER_LOCATION_INPUT_CHANGED action', () => {
  expect(actions.userLocationInputChanged({ prop: 'state', value: 'UT' })).toMatchSnapshot();
});

it('creates a USER_LOCATION_INPUT_CHANGED action', () => {
  expect(actions.userLocationInputChanged({ prop: 'zipcode', value: '84111' })).toMatchSnapshot();
});
