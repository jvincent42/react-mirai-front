import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Button from 'components/Button';


const WithData = ({ query, children: Children }) => (
  <Query query={query}>
    {({
      loading,
      error,
      data,
      refetch,
    }) => {
      if (loading) return <div>Loading ...</div>;
      if (error) return <div>Error</div>;
      return (
        <div>
          <Children {...data} />
          <Button type="secondary" onClick={() => refetch()}>Refetch</Button>
        </div>
      );
    }}
  </Query>
);


WithData.propTypes = {
  query: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
};

export default WithData;
