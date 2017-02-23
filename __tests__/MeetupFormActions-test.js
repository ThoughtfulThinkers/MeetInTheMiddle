import configureMockStore from 'redux-mock-store'; // mock store
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';
import { addMeetup, meetupEdit, changeStatus, deleteMeetup } from '../actions';
import {
        getUser,
        pushMeetup,
        updateMeetup,
        setStatus,
        removeGuest,
        removeMeetup
      } from '../actions/firebase-functions/MeetupFormActions';

jest.mock('react-native-router-flux');
jest.mock('../actions/firebase-functions/MeetupFormActions');

Actions.meetup = jest.fn();
Actions.rsvp = jest.fn();
Actions.meetups = jest.fn();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('addMeetup', () => {
  it('dispatches the correct actions on successful request', () => {
    getUser.mockReturnValue({ uid: 1 });
    pushMeetup.mockReturnValue(new Promise((resolve, reject) => resolve({ key: 1 })));
    const expectedActions = [{"type": "ADD_MEETUP"},
        {"type": "ADD_MEETUP_SUCCESS"},
        {"meetup": {"attendingNames": {},
        "chat": {}, "location": "", "name": "meetup",
        "status": "created", "uid": 1, "user": 1,
        "users": {}, "vote": {}}, "type": "SET_CURRENT_MEETUP"}];
    const store = mockStore();
    return store.dispatch(addMeetup({ name: 'meetup' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
});

describe('meetupEdit', () => {
  it('dispatches the correct actions on successful request', () => {
    updateMeetup.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));
    const expectedActions = [{ "type": "EDIT_MEETUP"}, {"type": "EDIT_MEETUP_SUCCESS" }];
    const store = mockStore();
    return store.dispatch(meetupEdit(0, 1, 2))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
});

describe('changeStatus', () => {
  it('dispatches the correct actions on successful request', () => {
    setStatus.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));
    const expectedActions = [{ "prop": "status", "type": "MEETUP_CHANGED", "value": "guests" }];
    const store = mockStore();
    return store.dispatch(changeStatus({ uid: 1 }, 'guests'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
});

describe('deleteMeetup', () => {
  it('dispatches the correct actions on successful request', () => {
    removeGuest.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));
    removeMeetup.mockReturnValue(new Promise((resolve, reject) => resolve('ok')));
    const expectedActions = [{ "type": "EDIT_MEETUP" }, { "type": "RESET_MEETUP" }];
    const store = mockStore();
    return store.dispatch(deleteMeetup(0, [{}, {}, {}]))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
});
