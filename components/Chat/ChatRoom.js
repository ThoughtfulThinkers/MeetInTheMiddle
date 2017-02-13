import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { View } from 'react-native';
// import Backend from '../../Backend';
import { fbConfig } from '../../envConfig';
import {
  closeMeetUpChat,
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
    // this.setState(previousState => {
    //   return GiftedChat.append(previousState.messages, this.props.messages);
    // });
  }

  componentWillUnmount() {
    // Backend.closeChat();
    // const { uid } = this.props.meetup;
    // this.props.closeMeetUpChat(uid);
  }

  sendMessage(message) {
    this.props.sendMessageByMeetup(this.props.meetup.uid, message);
  }

  sortMessages() {
    // console.log()
    const messageArr = [];
    for (let i = 0; i < this.props.messages.length; i++) {
      if (this.props.messages[i].roomId === this.props.meetup.uid) {
        messageArr.unshift(this.props.messages[i]);
      }
    }
    // console.log('ChatRoom messageArr', messageArr);
    return messageArr;
  }
  // messages={this.props.messages}
  render() {
    // console.log('messages: ', this.props.messages);
    return (
      <GiftedChat
        messages={this.sortMessages()}
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
  return { messages, firstName, lastName };
};

export default connect(mapStateToProps, {
  closeMeetUpChat,
  fetchMessagesByMeetup,
  sendMessageByMeetup,
})(ChatRoom);

ChatRoom.defaultProps = {
  name: 'John Doe',
};

ChatRoom.propTypes = {
  name: React.PropTypes.string,
};
