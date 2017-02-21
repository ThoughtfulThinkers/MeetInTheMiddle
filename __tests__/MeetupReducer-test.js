import MeetupReducer from '../reducers/MeetupReducer';

import * as actions from '../actions';
import {
  FETCH_MEETUPS,
  FETCH_MEETUPS_SUCCESS,
  FETCH_USER_MEETUPS,
  FETCH_USER_MEETUPS_SUCCESS,
  DELETE_RSVP_SUCCESS
} from '../actions/types';

describe('filterReducer', () => {
  it('default', () => {
    expect(MeetupReducer(undefined, { type: 'null' })).toMatchSnapshot();
  });

  it('fetch_meetups', () => {
    expect(MeetupReducer(undefined, { type: FETCH_MEETUPS })).toMatchSnapshot();
  });

  it('fetch meetups success', () => {
    expect(MeetupReducer(undefined, { type: FETCH_MEETUPS_SUCCESS, payload: { 5321673: { name: 'test' } } })).toMatchSnapshot();
  });

  it('fetch user meetups', () => {
    expect(MeetupReducer(undefined, { type: FETCH_USER_MEETUPS })).toMatchSnapshot();
  });

  it('fetch user meetups success', () => {
    expect(MeetupReducer(undefined, { type: FETCH_USER_MEETUPS_SUCCESS, payload: { 5321673: { name: 'test' } } })).toMatchSnapshot();
  });

  it('delete rsvp success', () => {
    expect(MeetupReducer(undefined, { type: DELETE_RSVP_SUCCESS, id: 1, meetup: { 5321673: { name: 'test' } } })).toMatchSnapshot();
  });
});
