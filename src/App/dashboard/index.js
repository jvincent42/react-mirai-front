/* eslint-env browser */
import React, { PureComponent } from 'react';

import Todos from './Todos';


class Dashboard extends PureComponent {
  render() {
    return (
      <div>
        <Todos />
      </div>
    );
  }
}


export default Dashboard;
