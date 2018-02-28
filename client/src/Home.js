import React, {Component} from 'react';
import axios from 'axios';
import StatusList from './StatusList.js';
import {Container} from 'semantic-ui-react';

class Home extends Component {
  constructor(props) {
    super(props);
    // TODO: Should keep track of current user in another spot
    // TODO: statuses should not include current user's status
    this.state = {
      statuses: [],
    };
  }

  fetchStatusData() {
    axios.get('/api/status').then(results => {
      this.setState({
        statuses: results.data,
      });
    });
  }

  componentDidMount() {
    this.fetchStatusData();
  }

  render() {
    return (
      <Container style={{marginTop: '7em'}}>
        <h2>This is the `Home` component</h2>
        {/* <Status statusData={this.state.userStatusData} /> */}
        <StatusList statuses={this.state.statuses} />
      </Container>
    );
  }
}

export default Home;
