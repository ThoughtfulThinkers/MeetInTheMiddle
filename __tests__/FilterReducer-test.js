import mockStore from 'redux-mock-store';
import FilterReducer from '../reducers/FilterReducer';

import * as actions from '../actions';

it('undefined', () => {
  expect(FilterReducer(undefined, { type: 'null' })).toMatchSnapshot();
});

it('setText', () => {
  expect(FilterReducer(undefined, actions.setText('Penn'))).toMatchSnapshot();
});

it('setLocation', () => {
  expect(FilterReducer(undefined, actions.setLocation('Pennsylvania'))).toMatchSnapshot();
});
