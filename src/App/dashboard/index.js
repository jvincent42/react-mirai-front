import React, { PureComponent } from 'react';

import Button from '../components/Button';


class Dashboard extends PureComponent {
  render() {
    return (
      <div>
        <Button>My button</Button>
        <Button block>My button</Button>
        <Button type="primary" block>My button</Button>
        <Button type="secondary" block>My button</Button>
      </div>
    );
  }
}


export default Dashboard;
