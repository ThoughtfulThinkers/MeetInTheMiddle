import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { View } from 'react-native';
import Backend from '../../Backend';
import {
  fetchMessagesByMeetup,
} from '../../actions';

class ChatRoom extends Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    const { uid } = this.props.meetup;
    this.props.fetchMessagesByMeetup(uid);
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

const mapStateToProps = ({ chat, user }) => {
  const { messages } = chat;
  const { firstName, lastName } = user;
  return { messages, };
};

export default connect(mapStateToProps, {
  fetchMessagesByMeetup,
})(ChatRoom);

ChatRoom.defaultProps = {
  name: 'John Doe',
};

ChatRoom.propTypes = {
  name: React.PropTypes.string,
};
