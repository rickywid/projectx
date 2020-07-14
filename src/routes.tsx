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
import Technology from './components/technology';
import Category from './components/category';
import TechnologyFilter from './components/technologyFilter';
import CategoryFilter from './components/categoryFilter';
import Guidelines from './components/guidelines';

import NoMatch from './components/noMatch';

const Routes = (
  <Switch>
    <Route exact path="/" component={Root} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/upload" component={ProjectUpload} />
    <Route exact path="/tag/technology" component={Technology} />
    <Route exact path="/tag/tech/:technology"  render={({ match }) => <TechnologyFilter key={match.params.username} match={match} />}  />
    <Route exact path="/tag/category" component={Category} />
    <Route exact path="/tag/category/:category"  render={({ match }) => <CategoryFilter key={match.params.username} match={match} />}  />
    <Route exact path="/project/:id" component={Project} />
    <Route exact path="/user/:username" render={({ match }) => <UserProfile key={match.params.username} match={match} /> } />
    <Route exact path="/user/edit/:username" component={UserEdit} />
    <Route exact path="/project/edit/:username" render={({ match }) => <ProjectEdit key={match.params.username} />} />
    <Route exact path="/search"  render={({ location }) => <SearchResults key={location.search} /> } />
    <Route exact path="/guidelines" component={Guidelines} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;

