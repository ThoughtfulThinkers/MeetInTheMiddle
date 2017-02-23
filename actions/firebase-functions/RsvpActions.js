import firebase from 'firebase';

export const getUser = () => {
  const { currentUser } = firebase.auth();
  return currentUser;
};

export const setGuest = (meetupId, userId, guest) => {
  return firebase.database().ref(`/meetups/${meetupId}/users/${userId}`)
    .set(guest);
};

export const setMeetup = (userId, meetup) => {
  return firebase.database().ref(`/users/${userId}/meetups/${meetup.uid}`)
  .set(meetup);
};

export const updateGuest = (meetupId, updates) => {
  return firebase.database().ref(`/meetups/${meetupId}/users`)
  .update(updates);
};

export const updateMeetup = (userId, meetup) => {
  return firebase.database().ref(`/users/${userId}/meetups/${meetup.uid}`)
  .set(meetup);
};

export const removeGuest = (meetupId, userId) => {
  return firebase.database().ref(`/meetups/${meetupId}/users/${userId}`)
    .remove();
};

export const removeMeetup = (meetupId, userId) => {
  return firebase.database().ref(`/users/${userId}/meetups/${meetupId}`)
    .remove();
};

export const updateStatus = (meetupId) => {
  firebase.database().ref(`/meetups/${meetupId}`)
  .update({ '/status': 'created' });
};
