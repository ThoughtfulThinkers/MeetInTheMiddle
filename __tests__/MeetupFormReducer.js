import MeetupFormReducer from '../reducers/MeetupFormReducer';

import * as actions from '../actions';

import {
  ADD_MEETUP,
  ADD_MEETUP_SUCCESS,
  EDIT_MEETUP,
  EDIT_MEETUP_SUCCESS,
  SET_VOTE,
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  description: '',
  start: 'hourTwo',
  end: 'hourThree',
  state: 'New York',
  venue: { name: 'Top Picks', id: 'topPicks' },
  venues: {},
  status: 'created',
  location: '',
  voteStart: 'thirtyMin',
  voteEnd: 'hour'
};

describe('meetupFormReducer', () => {

it('meetupChange', () => {
  expect(MeetupFormReducer(INITIAL_STATE,
    actions.meetupChange('state', 'Pennsylvania'))).toMatchSnapshot();
});

it('setCurrentMeetup', () => {
  expect(MeetupFormReducer(INITIAL_STATE,
    actions.setCurrentMeetup({ name: 'test', description: 'test' }))).toMatchSnapshot();
});

it('add_meetup', () => {
  expect(MeetupFormReducer(INITIAL_STATE, { type: ADD_MEETUP })).toMatchSnapshot();
});

it('edit_meetup', () => {
  expect(MeetupFormReducer(INITIAL_STATE, { type: EDIT_MEETUP })).toMatchSnapshot();
});

it('set_vote', () => {
  expect(MeetupFormReducer({ venues: { 123: { name: 'test', vote: 0 } } },
  { type: SET_VOTE, venueId: 123, vote: 2 })).toMatchSnapshot();
});
});
