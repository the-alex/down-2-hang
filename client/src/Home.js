import React, {Component} from 'react';
import axios from 'axios';
import StatusList from './StatusList.js';
import StatusEditor from './StatusEditor.js';
import {Container, Grid} from 'semantic-ui-react';
import Auth from './Auth.js';

class Home extends Component {
  constructor(props) {
    super(props);
    // TODO: Should keep track of current user in another spot
    // TODO: statuses should not include current user's status
    this.state = {
      currentStatus: '',
      statuses: [],
    };
  }

  fetchStatusData() {
    axios.get('/api/status').then(results => {
      // Filter out this user's status from status list.
      let statuses = [];
      let currentStatus = '';
      for (const status of results.data) {
        if (status.username !== Auth.username) {
          statuses.push(status);
        } else {
          currentStatus = status.status.text;
        }
      }
      this.setState({
        statuses,
        currentStatus,
      });
    });
  }

  componentDidMount() {
    this.fetchStatusData();
  }

  render() {
    return (
      <Container style={{marginTop: '7em'}}>
        <Grid celled="internally" stackable>
          <Grid.Column width={8}>
            <StatusEditor currentStatus={this.state.currentStatus} />
          </Grid.Column>
          <Grid.Column width={8}>
            <StatusList statuses={this.state.statuses} />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Home;
