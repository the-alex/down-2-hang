import React from 'react';
import {Container, Grid, Segment, Header, Form} from 'semantic-ui-react';
import io from 'socket.io-client';
//import Auth from './Auth.js';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      message: '',
      messages: [],
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
  render() {
    return (
      <Container>
        <Segment>
          <Header as="h2">Chat</Header>
          <div class="ui small feed">
            {this.state.messages.map(message => {
              return (
                <div class="event">
                  <div class="content">
                    <div class="summary">
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
            placeholder="Username"
            value={this.state.username}
            onChange={ev => this.setState({username: ev.target.value})}
          />
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
