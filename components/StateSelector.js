import React, { Component } from 'react';
import { ListView } from 'react-native';
import StateItem from './StateItem';
import states from '../states';

class StateSelector extends Component {
  componentWillMount() {
    this.createDataSource();
  }

  createDataSource() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(states);
  }

  renderRow(state) {
      return <StateItem state={state} />;
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

export default StateSelector;
