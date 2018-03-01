import React from 'react';
import {Header, Table} from 'semantic-ui-react';

const StatusList = props => (
  <Table basic="very" celled collapsing>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Username</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {props.statuses.map((status, index) => (
        <Table.Row key={index}>
          <Table.Cell>
            <Header as="h4">
              <Header.Content>{status.username}</Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>{status.status.text}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default StatusList;
