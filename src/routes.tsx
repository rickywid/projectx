import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Root from './components/root';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import ProjectUpload from './components/projectUpload';
import Project from './components/project';
import UserProfile from './components/userProfile';
import ProjectEdit from './components/projectEdit';
import SearchResults from './components/searchResults';
import UserEdit from './components/userEdit';

import NoMatch from './components/noMatch';

const Routes = (
  <Switch>
    <Route exact path="/" component={Root} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/upload" component={ProjectUpload} />
    <Route exact path="/project/:id" component={Project} />
    <Route exact path="/user/:username" render={({ match }) => <UserProfile key={match.params.username} match={match} /> } />
    <Route exact path="/user/edit/:username" component={UserEdit} />
    <Route exact path="/project/edit/:username" component={ProjectEdit} />
    <Route exact path ="/search"  render={({ location }) => <SearchResults key={location.search} /> } />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;

