import React from 'react';
import {Container, Segment, Header, Form, Dropdown} from 'semantic-ui-react';
import io from 'socket.io-client';
import Auth from './Auth.js';
import axios from 'axios';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.fetchChats = this.fetchChats.bind(this);
    this.switchChat = this.switchChat.bind(this);

    this.state = {
      message: '',
      // Messages for in-focus chat
      messages: [],
      // List of chats returned at fetch
      chats: [],
      focused: 'lobby',
    };

    this.socket = io('localhost:3000');

    this.socket.on('RECEIVE_MESSAGE', data => {
      if (this.state.focused === data.chatName) {
        addMessage(data);
      }
    });

    const addMessage = data => {
      console.log(data);
      this.setState({messages: [...this.state.messages, data]});
      let chatWindow = document.getElementById('chatWindow');
      chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        username: Auth.username,
        message: this.state.message,
        chatName: this.state.focused,
      });
      this.setState({message: ''});
    };
  }

  fetchChats(callback) {
    axios.get(`/api/chats?username=${Auth.username}`).then(results => {
      console.log(results);
      // Get the messages for the chat in focus
      const chatMessages = results.data.filter(
        chat => chat.name === this.state.focused,
      )[0].messages;
      console.log(chatMessages);
      this.setState({chats: results.data, messages: chatMessages}, callback);
    });
  }

  switchChat(ev, data) {
    console.log(data.value);
    this.setState({focused: data.value}, this.fetchChats);
  }

  componentDidMount() {
    this.fetchChats();
  }

  render() {
    return (
      <Container>
        <Segment>
          <Header as="h2">Chat</Header>
          <Dropdown
            text={this.state.focused}
            fluid
            selection
            options={
              this.state.chats
                ? this.state.chats.map((chat, i) => ({
                    key: i,
                    text: chat.name,
                    value: chat.name,
                  }))
                : ''
            }
            onChange={this.switchChat}
          />
          <Segment
            raised
            style={{maxHeight: '300px', overflow: 'scroll'}}
            id="chatWindow">
            <div className="ui small feed">
              {this.state.messages.map((message, i) => {
                return (
                  <div key={i} className="event">
                    <div className="content">
                      <div className="summary">// {message.user.username}</div>
                      <p>{message.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Segment>
        </Segment>
        <Segment>
          <Form.Input
            type="text"
            placeholder="Message"
            value={this.state.message}
            onChange={ev => this.setState({message: ev.target.value})}
          />
          <Form.Button
            onClick={this.sendMessage}
            className="right floated blue button">
            Send
          </Form.Button>
        </Segment>
      </Container>
    );
  }
}

export default Chat;
