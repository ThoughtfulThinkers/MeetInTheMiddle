import {
  CHANGE_RSVP,
  SET_RSVP,
  SET_RSVP_SUCCESS
} from '../actions/types';

export const changeRSVP = (street, lat, lon) => {
  return {
    type: CHANGE_RSVP,
    street,
    lat,
    lon
  };
};

export const setRsvp = (street, lat, lon, meetupId) => {
  return (dispatch) => {
    dispatch({ type: SET_RSVP });

    //do firebase auth for current user in real version!
      //const { currentUser } = firebase.auth();
    const currentUser = { uid: 'sg6wGGasLIYbmNdzKdZTrc9mPDu1' };

    // const guest = {
    //
    // };
    // firebase.database().ref('/meetups')
    //   .push(meetup)
    //   .then(({ key }) => {
    //     // console.log('created meetup: ', key);
    //     dispatch({ type: ADD_MEETUP_SUCCESS });
    //     Actions.meetup({ type: 'reset', meetup });
    //   })
    //   .catch((err) => console.log(err));
    // };
//    push onto current user meetups
//    push onto current meetup

    console.log(street, lat, lon, meetupId);
  };
};
