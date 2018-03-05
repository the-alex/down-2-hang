import React, {Component} from 'react';
import {Table, Checkbox, Button, Icon} from 'semantic-ui-react';
import axios from 'axios';
import Auth from './Auth.js';

class StatusList extends Component {
  constructor(props) {
    super(props);

    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.createChat = this.createChat.bind(this);

    this.state = {
      selected: [Auth.username],
    };
  }

  handleCheckbox(ev, data) {
    const username = data.value;
    if (data.checked && !this.state.selected.includes(username)) {
      this.setState(prevState => ({
        selected: [...prevState.selected, username],
      }));
    } else if (!data.checked) {
      // Remove the user
      const selected = this.state.selected.filter(name => name !== username);
      this.setState({selected});
    }
  }

  createChat() {
    axios
      .post('/api/chats', {
        name: this.state.selected.join('/'),
        participants: this.state.selected,
      })
      .then(res => console.log(res));
  }

  render() {
    return (
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.statuses.map((status, index) => (
            <Table.Row key={index}>
              <Table.Cell collapsing>
                <Checkbox
                  value={status.username}
                  toggle
                  onChange={this.handleCheckbox}
                />
              </Table.Cell>
              <Table.Cell>{status.username}</Table.Cell>
              <Table.Cell>{status.status.text}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="2">
              <Button
                floated="left"
                icon
                onClick={this.createChat}
                labelPosition="left"
                primary
                size="small">
                <Icon name="user" />
                Create New Chat
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

export default StatusList;
