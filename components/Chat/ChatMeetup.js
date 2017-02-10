import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { View } from 'react-native';
import Backend from '../../Backend';
import {

} from '../../actions';

class Chat extends Component {
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

const mapStateToProps = ({ chat }) => {
  const { messages } = chat;
  return { messages, };
};

export default connect(mapStateToProps, {

})(Chat);

Chat.defaultProps = {
  name: 'John Doe',
};

Chat.propTypes = {
  name: React.PropTypes.string,
};
