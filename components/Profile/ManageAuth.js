import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import {
  Button, Card, CardSection,
  Input
} from '../common';

import {
  authInputChanged,
  emailChanged,
  loginUser,
  passwordChanged,
  updateUserEmail,
  updateUserPassword,
  userInputChanged,
} from '../../actions';

class ManageAuth extends Component {

  onSubmitUpdate() {
    const { password, newPassword, confirmPassword } = this.props;

    console.log('onSubmitUpdate: ', password, newPassword, confirmPassword);
    if (!password) {
      console.log('ManageAuth: no pasword');
      return;
    }
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
                label="New Password"
                placeholder="new password"
                value={this.props.newPassword}
                onChangeText={value => this.props.authInputChanged({ prop: 'newPassword', value })}
              />
            </CardSection>
            <CardSection>
              <Input
                secureTextEntry
                label="Confim Password"
                placeholder="new password"
                value={this.props.confirmPassword}
                onChangeText={value =>
                  this.props.authInputChanged({ prop: 'confirmPassword', value })}
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
            label="Password"
            placeholder="current password"
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

export default connect(mapStateToProps, {
  authInputChanged,
  emailChanged,
  loginUser,
  passwordChanged,
  updateUserEmail,
  updateUserPassword,
  userInputChanged,
})(ManageAuth);


// ManageAuth.propTypes = {
//   email: React.PropTypes.string,
//   password: React.PropTypes.string,
// };
