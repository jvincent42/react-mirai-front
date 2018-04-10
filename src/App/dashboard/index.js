import React, { PureComponent } from 'react';
import gql from 'graphql-tag';

import Button from 'components/Button';
import WithData from 'components/WithData';


const GET_MOVIES = gql`
  query {
    hello
  }
`;


class Dashboard extends PureComponent {
  render() {
    return (
      <div>
        <Button block>My button !</Button>
        <WithData query={GET_MOVIES}>
          {({ hello }) => <div>{hello}</div>}
        </WithData>
      </div>
    );
  }
}


export default Dashboard;
