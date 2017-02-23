import configureMockStore from 'redux-mock-store'; // mock store
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';

import {
        changeRSVP,
        setRsvp,
        editRsvp,
        deleteRsvp,
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

describe('editRsvp', () => {
  it('dispatches the correct actions on successful request', () => {
    getUser.mockReturnValue(new Promise((resolve, reject) => resolve({ uid: 1 })));
    updateGuest.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));
    updateMeetup.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));

    const expectedActions = [{ "type": "SET_RSVP"}, {"type": "SET_RSVP_SUCCESS" }];
    const store = mockStore();
    return store.dispatch(editRsvp(0, 0, 123, {}, 'User'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
});

describe('deleteRsvp', () => {
  it('dispatches the correct actions on successful request', () => {
    getUser.mockReturnValue(new Promise((resolve, reject) => resolve({ uid: 1 })));
    removeGuest.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));
    removeMeetup.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));
    updateStatus.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));

    const expectedActions = [
      { "type": "SET_RSVP"}, 
      {"id": 42, "meetup": {"name": "name", "uid": 42, "users": {"1": ""}},
      "type": "DELETE_RSVP_SUCCESS" }];
    const store = mockStore();
    return store.dispatch(deleteRsvp({ name: 'name', uid: 42, users: { 1: '' } }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
});
