import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';

import restricted from 'utils/decorators/restricted';

import Dashboard from './dashboard';
import Login from './auth/login';
import Admin from './admin';
import NotFound from './notfound';


class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={restricted(Admin)} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}


export default hot(module)(App);
