import 'whatwg-fetch';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { changeStatus } from './MeetupFormActions';
import { SET_CURRENT_MEETUP, SET_VOTE, MEETUP_CHANGED } from './types';
import { foursquareConfig, googlePlacesConfig } from '../envConfig';

const { ID, SECRET } = foursquareConfig;
const { apiKey } = googlePlacesConfig;
const venueIds = [{ name: 'Arts & Entertainment', id: '4d4b7104d754a06370d81259' },
{ name: 'College & University', id: '4d4b7105d754a06372d81259' },
{ name: 'Event', id: '4d4b7105d754a06373d81259' },
{ name: 'Food', id: '4d4b7105d754a06374d81259' },
{ name: 'Coffee Shop', id: '4bf58dd8d48988d1e0931735' },
{ name: 'Fast Food Restaurant', id: '4bf58dd8d48988d16e941735' },
{ name: 'Nightlife Spot', id: '4d4b7105d754a06376d81259' },
{ name: 'Bar', id: '4bf58dd8d48988d116941735' },
{ name: 'Outdoors & Recreation', id: '4d4b7105d754a06377d81259' },
{ name: 'Park', id: '4bf58dd8d48988d163941735' },
{ name: 'Professional & Other Places', id: '4d4b7105d754a06375d81259' },
{ name: 'Community Center', id: '52e81612bcbc57f1066b7a34' },
{ name: 'Spiritual Center', id: '4bf58dd8d48988d131941735' },
{ name: 'Shop & Service', id: '4d4b7105d754a06378d81259' },
{ name: 'Travel & Transport', id: '4d4b7105d754a06379d81259' }];

export const createVoting = (lat, lon, meetup) => {
  const venueType = meetup.venue.id;
  return dispatch => {
    const search = `https://api.foursquare.com/v2/venues/explore?ll=${lat},${lon}&client_id=${ID}&client_secret=${SECRET}&sortByDistance=true&section=${venueType}&limit=10&v=20170201&m=foursquare`;
    fetch(search)
    .then(response => response.json())
    .then(data => {
      let venues;
      if (!data.response.groups || data.response.groups.length === 0 || data.response.groups[0].items.length === 0) {
        const search2 = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;
        fetch(search2)
        .then(response => response.json())
        .then((data2) => {
          let formattedAddress;
          if (!data2 || !data2.results || !data2.results[0] || !data2.results[0].formatted_address) {
            formattedAddress = 'Invalid Location';
          } else {
            formattedAddress = data2.results[0].formatted_address;
          }
          const location = {
            formattedAddress: [formattedAddress],
            lat,
            lon,
            name: formattedAddress,
            votes: 0
          };
          dispatch(changeLocation(location, meetup.uid));
          dispatch(changeStatus(meetup, 'set'));
        })
        .catch(err => console.log(err));
      } else {
        venues = {};
        data.response.groups[0].items.forEach(item => {
          const { venue } = item;
          const { name, location, id } = venue;
          const { formattedAddress, lng } = location;
          venues[id] = { name, formattedAddress, lat: location.lat, lon: lng, votes: 0 };
        });
      }
      const newMeetup = { ...meetup, status: 'voting', venues };
      firebase.database().ref(`/meetups/${meetup.uid}`)
      .set(newMeetup)
      .then(() => {
        dispatch({ type: SET_CURRENT_MEETUP, meetup: newMeetup });
        Actions.meetup({ type: 'refresh' });
      })
      .catch(err => console.log('create venues error', err));
    })
    .catch(err => console.log(err));
  };
};

export const setVote = (meetupId, venueId, venueVote) => {
  return dispatch => {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/meetups/${meetupId}/vote`)
    .set(venueId)
    .then(() => {
      firebase.database().ref(`/meetups/${meetupId}/venues/${venueId}/votes`)
      .set(venueVote)
      .then(() => {
        dispatch({ type: SET_VOTE, venueId, vote: venueVote });
        Actions.meetup({ type: 'refresh' });
      });
    })
    .catch(err => console.log(err));
  };
};

export const voteChange = (meetupId, venueId, venueVote) => {
  return dispatch => {
      const { currentUser } = firebase.auth();

      //get old vote location
      let userPreviousVote;
      firebase.database().ref(`/users/${currentUser.uid}/meetups/${meetupId}/vote`)
        .on('value', (snapshot) => {
          userPreviousVote = snapshot.val();
      });

      //get old venue vote count
      let oldVenueCount;
      firebase.database().ref(`/meetups/${meetupId}/venues/${userPreviousVote}/votes`)
        .on('value', (snapshot) => {
          oldVenueCount = snapshot.val();
      });

      //lower old vote count, raise new vote count, replace user venue id
      oldVenueCount -= 1;
      const updates = {};
      updates[`/users/${currentUser.uid}/meetups/${meetupId}/vote`] = venueId;
      updates[`/meetups/${meetupId}/venues/${userPreviousVote}/votes`] = oldVenueCount;
      updates[`/meetups/${meetupId}/venues/${venueId}/votes`] = venueVote;

      firebase.database().ref().update(updates).then(() => {
        dispatch({ type: SET_VOTE, venueId, vote: venueVote });
        Actions.meetup({ type: 'refresh' });
      });
  };
};

export const changeLocation = (location, meetupId) => {
  return (dispatch) => {
    firebase.database().ref(`/meetups/${meetupId}/location`)
      .set(location)
      .then(() => {
        dispatch({
            type: MEETUP_CHANGED,
            prop: 'location',
            value: location });
            Actions.meetup({ type: 'refresh' });
      })
      .catch((err) => console.log(err));
    };
};
