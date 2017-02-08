import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, CardSection, Input } from './common';


class LocationSelector extends Component {
  onCurrentLocationPress() {
    console.log('current location');
  }

  onPreferredLocationPress() {
    console.log('preferred location');
  }

  onChange(e) {
    console.log(e.target.value);
  }

  onSubmit() {
    console.log('submitting location');
  }

  render() {
    return (
      <View>
        <CardSection>
          <TouchableOpacity
            onPress={this.onCurrentLocationPress()}
          >
            <Text style={styles.textStyle}>
              Current Location
            </Text>
          </TouchableOpacity>
        </CardSection>

        <CardSection>
          <TouchableOpacity
            onPress={this.onPreferredLocationPress()}
          >
            <Text style={styles.textStyle}>
              Preferred Location (TODO: replace this)
            </Text>
          </TouchableOpacity>
        </CardSection>

        <CardSection>
          <Text>Search goes here</Text>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 18,
    padding: 5
  }
};

const mapStateToProps = state => {
  return {}
};

export default connect(mapStateToProps, null)(LocationSelector);
