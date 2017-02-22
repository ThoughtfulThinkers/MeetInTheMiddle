
import configureMockStore from 'redux-mock-store'; // mock store
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';
import { createVoting, changeLocation, setVote } from '../actions';
import { setLocation, firebaseUserVote, firebaseVenueVote } from '../actions/firebase-functions/MapActions';

jest.mock('react-native-router-flux');
jest.mock('../actions/firebase-functions/MapActions');

Actions.meetup = jest.fn();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('changeLocation', () => {
  it('dispatches the correct actions on successful request', () => {
    setLocation.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));
    const expectedActions = [
      { "prop": "location", "type": "MEETUP_CHANGED", "value": {"lat": 0, "lon": 0 } }];
    const store = mockStore();
    return store.dispatch(changeLocation({ lat: 0, lon: 0 }, 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
});

describe('setVote', () => {
  it('dispatches the correct actions on successful request', () => {
    firebaseUserVote.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));
    firebaseVenueVote.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));
    const expectedActions = [{ "type": "SET_VOTE", "venueId": 1, "vote": 2 }];
    const store = mockStore();
    return store.dispatch(setVote(0, 1, 2))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
});
