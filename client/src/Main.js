import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './Home.js';
import Login from './Login.js';
import Signup from './Signup.js';
import Auth from './Auth.js';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated()? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const Main = () => (
  <main>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      {/* <Route path="/profile" component={Profile} /> */}
    </Switch>
  </main>
);

export default Main;
