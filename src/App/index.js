import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';

import Dashboard from './dashboard';


class App extends PureComponent {
  render() {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }
}


export default hot(module)(App);
