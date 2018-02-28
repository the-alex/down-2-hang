import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home.js';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route path="/login" component={Login} /> */}
      {/* <Route path="/signup" component={Signup} /> */}
      {/* <Route path="/profile" component={Profile} /> */}
    </Switch>
  </main>
);

export default Main;
