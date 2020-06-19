import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Root from './components/root';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import ProjectUpload from './components/projectUpload';
import Project from './components/project';
import UserProfile from './components/userProfile';
import NoMatch from './components/noMatch';

const Routes = (
  <Switch>
    <Route exact path="/" component={Root} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/upload" component={ProjectUpload} />
    <Route exact path="/project/:id" component={Project} />
    <Route exact path="/user/:username" component={UserProfile} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;