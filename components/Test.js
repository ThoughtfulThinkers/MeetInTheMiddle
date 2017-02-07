import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Test extends Component {

  onButtonPress() {
    console.log("button")
    Actions.map();
  }
    render() {
      return (
        <View>
          <Text>Test!</Text>
          <Button title={"Get MAP"} onPress={this.onButtonPress.bind(this)} />
        </View>
      );
    }
}
