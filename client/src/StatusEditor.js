import React, {Component} from 'react';
import {Form, Grid, Header, Segment, Container} from 'semantic-ui-react';
import axios from 'axios';
import Auth from './Auth.js';

class StatusEditor extends Component {
  constructor(props) {
    super(props);

    this.updateStatus = this.updateStatus.bind(this);

    this.state = {
      textInput: '',
      currentStatus: props.currentStatus,
    };
  }

  updateStatus() {
    let that = this;
    axios
      .post('/api/status', {
        username: Auth.username,
        statusText: that.state.textInput,
      })
      .then(results => {
        that.setState({textInput: '', currentStatus: results.data.status.text});
      });
  }

  render() {
    return (
      <Container>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{maxWidth: 300}}>
            <Form size="small">
              <Segment>
                <Header as="h3">Modify your Status</Header>
                <Form.Input
                  action={{
                    content: 'Update',
                    onClick: () => {
                      this.updateStatus();
                    },
                  }}
                  fluid
                  onChange={e => this.setState({textInput: e.target.value})}
                  placeholder={
                    this.state.currentStatus || this.props.currentStatus
                  }
                />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default StatusEditor;
