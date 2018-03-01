import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Container,
} from 'semantic-ui-react';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.submitCredentials = this.submitCredentials.bind(this);
    this.state = {
      username: '',
      password: '',
      redirect: false,
    };
  }

  submitCredentials() {
    const {username, password} = this.state;
    axios.post('/api/users/signup', {username, password}).then(results => {
      this.setState({redirect: true});
    });
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/login" />
    ) : (
      <Container style={{marginTop: '7em'}}>
        <div className="login-form">
          <Grid
            textAlign="center"
            style={{height: '100%'}}
            verticalAlign="middle">
            <Grid.Column style={{maxWidth: 450}}>
              <Header as="h2" color="teal" textAlign="center">
                <Image src="/logo.png" /> Create a new account
              </Header>
              <Form size="large">
                <Segment stacked>
                  <Form.Input
                    fluid
                    onChange={e => this.setState({username: e.target.value})}
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                  />
                  <Form.Input
                    fluid
                    onChange={e => this.setState({password: e.target.value})}
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                  />
                  <Button
                    onClick={this.submitCredentials}
                    color="teal"
                    fluid
                    size="large">
                    Signup
                  </Button>
                </Segment>
              </Form>
              <Message>
                Been here before?{' '}
                <a>
                  <Link to="/login">Login</Link>
                </a>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default Signup;
