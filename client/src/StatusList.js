import React, {Component} from 'react';
import {Header, Table, Checkbox, Button, Icon} from 'semantic-ui-react';

class StatusList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: [],
    };
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
                <Checkbox slider />
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
