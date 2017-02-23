import configureMockStore from 'redux-mock-store'; // mock store
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';

import {
        changeRSVP,
        setRsvp,
      } from '../actions';
import {
          getUser,
          setGuest,
          setMeetup,
          updateGuest,
          updateMeetup,
          removeGuest,
          removeMeetup,
          updateStatus,
        } from '../actions/firebase-functions/RsvpActions';


jest.mock('react-native-router-flux');
jest.mock('../actions/firebase-functions/RsvpActions');


Actions.meetup = jest.fn();
Actions.login = jest.fn();
Actions.meetups = jest.fn();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('changeRsvp', () => {
  it('dispatches the correct actions on successful fetch request', () => {
    fetch.mockResponse(JSON.stringify({ results: [{ formatted_address: 'test' }] }));

    const expectedActions = [
      { "address": "test", "lat": 0, "lon": 0, "type": "CHANGE_RSVP" }]
    const store = mockStore();

    return store.dispatch(changeRSVP(0, 0))
      //getAccessToken contains the fetch call
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
});


describe('setRsvp', () => {
  it('dispatches the correct actions on successful request', () => {
    getUser.mockReturnValue(new Promise((resolve, reject) => resolve({ uid: 1 })));
    setGuest.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));
    setMeetup.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));
    const expectedActions = [{ "type": "SET_RSVP"}, {"type": "SET_RSVP_SUCCESS" }];
    const store = mockStore();

    return store.dispatch(setRsvp(0, 0, 123, {}, 'User'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
});
//
// describe('setVote', () => {
//   it('dispatches the correct actions on successful request', () => {
//     firebaseUserVote.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));
//     firebaseVenueVote.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));
//     const expectedActions = [{ "type": "SET_VOTE", "venueId": 1, "vote": 2 }];
//     const store = mockStore();
//     return store.dispatch(setVote(0, 1, 2))
//       .then(() => {
//         expect(store.getActions()).toEqual(expectedActions);
//       });
//     });
// });
//
// describe('createVoting', () => {
//   it('dispatches the correct actions on successful request', () => {
//     fetch.mockResponse(JSON.stringify(data));
//     setMeetup.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));
//     const expectedActions = [{"meetup": {"name": "test", "status": "voting", "venue":
//       { "id": "coffee"}, "venues": {"3fd66200f964a520efe81ee3":
//       { "formattedAddress": ["1 Water St (at Brooklyn Bridge)", "Brooklyn, NY 11201"],
//         "lat": 40.7037369396286,
//         "lon": -73.9947760105133,
//         "name": "The River Café", "votes": 0}}}, "type": "SET_CURRENT_MEETUP"}];
//     const store = mockStore();
//     return store.dispatch(createVoting(0, 1, { name: 'test', venues: {}, venue: { id: 'coffee' } }))
//       .then(() => {
//         expect(store.getActions()).toEqual(expectedActions);
//       });
//     });
// });
