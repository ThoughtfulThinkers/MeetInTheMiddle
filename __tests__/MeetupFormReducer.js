import MeetupFormReducer from '../reducers/MeetupFormReducer';

import * as actions from '../actions';

import {
  ADD_MEETUP,
  ADD_MEETUP_SUCCESS,
  EDIT_MEETUP,
  EDIT_MEETUP_SUCCESS,
  CREATE_VOTING_SUCCESS,
  SET_VOTE,
  RESET_MEETUP,
} from '../actions/types';

it('undefined', () => {
  expect(MeetupFormReducer(undefined, { type: 'null' })).toMatchSnapshot();
});

it('meetupChange', () => {
  expect(MeetupFormReducer(undefined, actions.meetupChange('state', 'Pennsylvania'))).toMatchSnapshot();
});

it('setCurrentMeetup', () => {
  expect(MeetupFormReducer(undefined, actions.setCurrentMeetup({ name: 'test', description: 'test' }))).toMatchSnapshot();
});

it('resetMeetup', () => {
  expect(MeetupFormReducer(undefined, actions.resetMeetup())).toMatchSnapshot();
});

it('add_meetup', () => {
  expect(MeetupFormReducer(undefined, { type: ADD_MEETUP })).toMatchSnapshot();
});

it('add_meetup_success', () => {
  expect(MeetupFormReducer(undefined, { type: ADD_MEETUP_SUCCESS })).toMatchSnapshot();
});

it('edit_meetup', () => {
  expect(MeetupFormReducer(undefined, { type: EDIT_MEETUP })).toMatchSnapshot();
});

it('edit_meetup_success', () => {
  expect(MeetupFormReducer(undefined, { type: EDIT_MEETUP_SUCCESS })).toMatchSnapshot();
});

it('set_vote', () => {
  expect(MeetupFormReducer({ venues: { 123: { name: 'test', vote: 0 } } }, { type: SET_VOTE, venueId: 123, vote: 2 })).toMatchSnapshot();
});
