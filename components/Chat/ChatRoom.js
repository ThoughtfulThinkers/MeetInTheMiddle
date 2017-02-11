import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { View } from 'react-native';
import Backend from '../../Backend';
import { fbConfig } from '../../envConfig';
import {
  fetchMessagesByMeetup,
  sendMessageByMeetup,
} from '../../actions';

class ChatRoom extends Component {
  state = {
    messages: [],
    currentUserId: '',
  };

  componentWillMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUserId: currentUser.uid });

    const { uid } = this.props.meetup;
    this.props.fetchMessagesByMeetup(uid);
    this.setState(previousState => {
      return GiftedChat.append(previousState.messages, this.props.messages);
    });

    // Backend.loadMessages(message => {
    //   this.setState(previousState => {
    //     return {
    //       messages: GiftedChat.append(previousState.messages, this.props.message),
    //     };
    //   });
    // });


  }

  componentWillUnmount() {
    // Backend.closeChat();
  }

  sendMessage(message) {
    this.props.sendMessageByMeetup(this.props.meetup.uid, message);
  }

  render() {
    console.log('messages: ', this.props.messages)
    return (
      <GiftedChat
        messages={this.props.messages}
        onSend={message => {
          // Backend.sendMessage(message);
          this.sendMessage(message);
        }}
        user={{
          _id: this.state.currentUserId,
          name: this.props.name,
        }}
      />
    );
  }
}

// Backend.getUid()

const mapStateToProps = ({ chat, user }) => {
  const { messages } = chat;
  const { firstName, lastName } = user;
  return { messages, };
};

export default connect(mapStateToProps, {
  fetchMessagesByMeetup,
  sendMessageByMeetup,
})(ChatRoom);

ChatRoom.defaultProps = {
  name: 'John Doe',
};

ChatRoom.propTypes = {
  name: React.PropTypes.string,
};
