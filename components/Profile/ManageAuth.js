import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Acttions } from 'react-native-router-flux';
import { View, ScrollView, Text } from 'react-native';
import {
  Button, Card, CardSection,
  Input, Spinner
} from '../common';

import * as actions from '../../actions';

class ManageAuth extends Component {
  state = {
    msg: '',
  }

  componentDidMount() {
    this.props.email = '';
  }

  onSubmitUpdate() {
    let { password, newPassword, confirmPassword } = this.props;
    password = password.trim();
    newPassword = newPassword.trim();
    confirmPassword = confirmPassword.trim();
    if (!password) {
      this.setState({ msg: 'Password is required ' });
    } else if (!newPassword) {
      this.setState({ msg: 'New Password is required' });
    } else if (!confirmPassword) {
      this.setState({ msg: 'Confirm Password is required' });
    }
    // console.log('onSubmitUpdate: ', password, newPassword, confirmPassword);
    if (newPassword && newPassword === confirmPassword) {
      ('ManageAuth: calling updateUserPassword');
      this.props.updateUserPassword(newPassword, password);
    }
  }

  render() {
    return (
      <Card>
        <Card>
            <CardSection>
              <Text>Change Your Password</Text>
            </CardSection>
            <CardSection>
              <Input
                secureTextEntry
                label="New"
                placeholder="password"
                value={this.props.newPassword}
                onChangeText={value => this.props.authInputChanged({ prop: 'newPassword', value })}
              />
            </CardSection>
            <CardSection>
              <Input
                secureTextEntry
                label="Confirm"
                placeholder="password"
                value={this.props.confirmPassword}
                onChangeText={value => this.props.authInputChanged({ prop: 'confirmPassword', value })}
              />
            </CardSection>
          </Card>
        <Card>
          <CardSection>
            <Text style={styles.noticeStyle}>
              Current Password Required
            </Text>
          </CardSection>
          <CardSection>
            <Input
            secureTextEntry
            label="Current"
            placeholder="password"
            value={this.props.password}
            onChangeText={value => this.props.authInputChanged({ prop: 'password', value })}
            />
          </CardSection>
          <Card>
            <CardSection>
              <Button onPress={this.onSubmitUpdate.bind(this)}>
                Update
              </Button>
            </CardSection>
          </Card>
        </Card>
      </Card>
    );
  }
}

const styles = {
  noticeStyle: {
    fontSize: 15,
  }
};

const mapStateToProps = ({ auth }) => {
  const { password, newPassword, confirmPassword, } = auth;
  return { password, newPassword, confirmPassword, };
};

export default connect(mapStateToProps, actions)(ManageAuth);
