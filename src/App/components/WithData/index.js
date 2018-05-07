import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

class WithData extends PureComponent {
  static propTypes = {
    query: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
    LoadingComponent: PropTypes.func,
    ErrorComponent: PropTypes.func,
  }

  static defaultProps = {
    LoadingComponent: null,
    ErrorComponent: null,
  }

  render() {
    const {
      query,
      children: Children,
      LoadingComponent,
      ErrorComponent,
      ...props
    } = this.props;
    return (
      <Query query={query} {...props}>
        {({
          loading,
          error,
          data,
          refetch,
        }) => {
          if (loading) {
            return LoadingComponent
             ? <LoadingComponent />
             : <div>Loading ...</div>;
          }
          if (error) {
            return ErrorComponent
              ? <ErrorComponent error={error} />
              : <div>Error</div>;
          }
          return (
            <Children {...data} refetch={refetch} />
          );
        }}
      </Query>
    );
  }
}


export default WithData;
