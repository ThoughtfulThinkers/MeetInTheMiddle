import 'whatwg-fetch';
import { foursquareConfig } from '../envConfig';

const { ID, SECRET } = foursquareConfig;
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

export const createVoting = (lat, lon, venueId) => {
  const search = `https://api.foursquare.com/v2/venues/search?ll=${lat},${lon}&client_id=${ID}&client_secret=${SECRET}&radius=1600&intent=browse&categoryId=${venueId}&v=20170201&m=foursquare`;
  fetch(search)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
};
