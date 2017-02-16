import React, { Component } from 'react';
import { ListView } from 'react-native';
import Venue from './Venue';

const venueIds = [{ name: 'Food', id: 'food' },
{ name: 'Coffee', id: 'coffee' },
{ name: 'Shops', id: 'shops' },
{ name: 'Arts', id: 'arts' },
{ name: 'Outdoors', id: 'outdoors' },
{ name: 'Sights', id: 'sights' },
{ name: 'Trending', id: 'trending' },
{ name: 'Top Picks', id: 'topPicks' }];

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
