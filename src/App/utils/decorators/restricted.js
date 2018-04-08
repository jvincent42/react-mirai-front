import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';


const checkCredentials = () => Promise.resolve();


const restricted = (BaseComponent) => {
  class Restricted extends Component {
    static propTypes = {
      location: PropTypes.object.isRequired,
    }
    componentWillMount() {
      this.checkAuthentication(this.props);
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps);
      }
    }
    checkAuthentication(params) {
      const { history } = params;
      checkCredentials()
        .catch(() => history.replace('/login'));
    }
    render() {
      return <BaseComponent {...this.props} />;
    }
  }
  return withRouter(Restricted);
};


export default restricted;
