import React, { Component } from 'react';
import { ListView } from 'react-native';
import Vote from './Vote';

class VotingList extends Component {
  componentWillMount() {
    this.createDataSource();
  }

  createDataSource() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(this.props.venues);
  }

  renderRow(vote) {
      return <Vote vote={vote} />;
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

export default VotingList;
