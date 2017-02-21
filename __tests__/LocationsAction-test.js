import configureMockStore from 'redux-mock-store'; // mock store
import thunk from 'redux-thunk';
import { fetchGeoLocationByFullAddress } from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchGeoLocationByFullAddress', () => {
  it('dispatches the correct actions on successful fetch request', () => {
    fetch.mockResponse(JSON.stringify({ results: [{ geometry: { location: 'latlng' } }] }));

    const expectedActions = [
      { "type": 'FETCH_GEOLOCATION_BY_FULL_ADDRESS_SUCCESS', "payload": 'latlng' }]
    const store = mockStore();

    return store.dispatch(fetchGeoLocationByFullAddress('123 Main St', 'New York', 'New York'))
      //getAccessToken contains the fetch call
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
});
