import React from 'react';
import {Container, Segment, Header, Form} from 'semantic-ui-react';
import io from 'socket.io-client';
import Auth from './Auth.js';
import axios from 'axios';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.fetchMessages = this.fetchMessages.bind(this);

    this.state = {
      username: Auth.username,
      message: '',
      messages: [],
      //room: 'lobby',
    };

    this.socket = io('localhost:3000');

    this.socket.on('RECEIVE_MESSAGE', function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({messages: [...this.state.messages, data]});
      console.log(this.state.messages);
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        author: this.state.username,
        message: this.state.message,
      });
      this.setState({message: ''});
    };
  }

  fetchMessages() {
    axios.get('/api/chats').then(results => {
      console.log(results);
    });
  }

  componentDidMount() {
    this.fetchMessages();
  }

  render() {
    return (
      <Container>
        <Segment>
          <Header as="h2">Chat</Header>
          <div className="ui small feed">
            {this.state.messages.map(message => {
              return (
                <div className="event">
                  <div className="content">
                    <div className="summary">
                      {message.author}: {message.message}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
