import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Root from './components/root';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import NoMatch from './components/noMatch';

const Routes = (
  <Switch>
    <Route exact path="/" component={Root} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;