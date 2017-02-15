import React, { Component } from 'react';
import { ListView } from 'react-native';
import Venue from './Venue';

const venueIds = [{ name: 'Arts & Entertainment', id: '4d4b7104d754a06370d81259' },
{ name: 'College & University', id: '4d4b7105d754a06372d81259' },
{ name: 'Event', id: '4d4b7105d754a06373d81259' },
{ name: 'Food & Restaurants', id: '4d4b7105d754a06374d81259' },
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

class VenuePicker extends Component {
  componentWillMount() {
    this.createDataSource();
  }

  createDataSource() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(venueIds);
  }

  renderRow(venue) {
      return <Venue venue={venue} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

export default VenuePicker;
