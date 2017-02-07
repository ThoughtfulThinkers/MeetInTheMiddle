import React from 'react';

import { GiftedChat } from 'react-native-gifted-chat';
import { View } from 'react-native'
import Backend from '../Backend';

export default class Chat extends React.Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    Backend.loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
  }

  componentWillUnmount() {
    Backend.closeChat();
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={message => {
          Backend.sendMessage(message);
        }}
        user={{
          _id: Backend.getUid(),
          name: this.props.name,
        }}
      />
    );
  }
}

Chat.defaultProps = {
  name: 'John Doe',
};

Chat.propTypes = {
  name: React.PropTypes.string,
};
