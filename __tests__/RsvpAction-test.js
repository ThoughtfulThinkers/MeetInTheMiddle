import configureMockStore from 'redux-mock-store'; // mock store
import thunk from 'redux-thunk';
import { changeRSVP } from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('changeRsvp', () => {
  it('dispatches the correct actions on successful fetch request', () => {
    fetch.mockResponse(JSON.stringify({ results: [{ formatted_address: 'test' }] }));

    const expectedActions = [
      {"address": "test", "lat": 0, "lon": 0, "type": "CHANGE_RSVP"}]
    const store = mockStore();

    return store.dispatch(changeRSVP(0, 0))
      //getAccessToken contains the fetch call
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
});
