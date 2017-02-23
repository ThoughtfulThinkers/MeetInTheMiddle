import configureMockStore from 'redux-mock-store'; // mock store
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';
import { createVoting, changeLocation, setVote } from '../actions';
import { setLocation, firebaseUserVote, firebaseVenueVote, setMeetup } from '../actions/firebase-functions/MapActions';

jest.mock('react-native-router-flux');
jest.mock('../actions/firebase-functions/MapActions');

Actions.meetup = jest.fn();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const data = { response: { groups: [{ items: [{ venue: {
              id: "3fd66200f964a520efe81ee3",
              name: "The River Café",
              location: {
                lat: 40.7037369396286,
                lng: -73.9947760105133,
                formattedAddress: [
                  "1 Water St (at Brooklyn Bridge)",
                  "Brooklyn, NY 11201"] } } }] }] } };


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

describe('createVoting', () => {
  it('dispatches the correct actions on successful request', () => {
    fetch.mockResponse(JSON.stringify(data));
    setMeetup.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));
    const expectedActions = [{"meetup": {"name": "test", "status": "voting", "venue":
      { "id": "coffee"}, "venues": {"3fd66200f964a520efe81ee3":
      { "formattedAddress": ["1 Water St (at Brooklyn Bridge)", "Brooklyn, NY 11201"],
        "lat": 40.7037369396286,
        "lon": -73.9947760105133,
        "name": "The River Café", "votes": 0}}}, "type": "SET_CURRENT_MEETUP"}];
    const store = mockStore();
    return store.dispatch(createVoting(0, 1, { name: 'test', venues: {}, venue: { id: 'coffee' } }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
});
