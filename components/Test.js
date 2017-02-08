import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Test extends Component {

  onButtonPress() {
    Actions.map();
  }
    render() {
      return (
        <View>
          <Text>Test!</Text>
          <Button title={'Get MAP'} onPress={this.onButtonPress.bind(this)} />
            <TouchableOpacity
              onPress={name => Actions.chat({ name: 'Thoughtful Thinker' })}
              value={'Thoughtful Thinker'}
            >
              <Text>
                Chat
              </Text>
            </TouchableOpacity>
        </View>
      );
    }
}
