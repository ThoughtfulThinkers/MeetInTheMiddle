import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MeetupList from './MeetupList';

export default class LoginForm extends Component {

    onButtonPress() {
      console.log("button")
      Actions.test();
    }

    render() {
      return (
        <View>
          <Text>Login Here</Text>
          <Button title={"Test this!"} onPress={this.onButtonPress.bind(this)} />
          <MeetupList />
        </View>
      );
    }
}
