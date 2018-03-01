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
import Auth from './Auth.js';

class Login extends Component {
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
    Auth.authenticate(username, password).then(isAuthenticated => {
      this.setState({redirect: true});
    });
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/" />
    ) : (
      <Container style={{marginTop: '7em'}}>
        <div className="login-form">
          <Grid
            textAlign="center"
            style={{height: '100%'}}
            verticalAlign="middle">
            <Grid.Column style={{maxWidth: 450}}>
              <Header as="h2" color="teal" textAlign="center">
                <Image src="/logo.png" /> Log-in to your account
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
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                Need some credentials?{' '}
                <a>
                  <Link to="/signup">Sign Up</Link>
                </a>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default Login;
