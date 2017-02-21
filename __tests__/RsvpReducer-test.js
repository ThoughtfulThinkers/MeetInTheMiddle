import FilterReducer from '../reducers/FilterReducer';

import * as actions from '../actions';
import {
  CHANGE_RSVP,
  SET_RSVP,
  SET_RSVP_SUCCESS,
  DELETE_RSVP_SUCCESS
} from '../actions/types';

describe('rsvpReducer', () => {
  it('undefined', () => {
    expect(FilterReducer(undefined, { type: 'null' })).toMatchSnapshot();
  });

  it('changeRsvp', () => {
    expect(FilterReducer(undefined, { type: CHANGE_RSVP, lat: 1, lon: 1, address: '123 Main St' })).toMatchSnapshot();
  });

  it('setRsvp', () => {
    expect(FilterReducer(undefined, { type: SET_RSVP })).toMatchSnapshot();
  });

  it('setRsvp success', () => {
    expect(FilterReducer(undefined, { type: SET_RSVP_SUCCESS })).toMatchSnapshot();
  });

  it('delete Rsvp success', () => {
    expect(FilterReducer(undefined, { type: DELETE_RSVP_SUCCESS })).toMatchSnapshot();
  });
});
