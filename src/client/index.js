/* eslint-env browser */
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Application from '../';
import App from '../App';


const apolloClient = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: 'https://55pqv4kj39.lp.gql.zone/graphql',
  }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});


const render = (Component) => {
  ReactDom.render(
    <Application>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </ApolloProvider>
    </Application>,
    document.getElementById('app'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('../App', () => {
    render(App);
    // eslint-disable-next-line global-require
    render(require('../App'));
  });
}
