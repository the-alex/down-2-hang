import React from 'react';

const StatusList = props => (
  <ul>
    This is the status list
    {props.statuses.map((status, i) => (
      <li key={i}>
        {status.username}: {status.status.text}
      </li>
    ))}
  </ul>
);

export default StatusList;
