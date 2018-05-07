/* eslint-env browser */
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';

import Application from '../';
import App from '../App';


const cache = new InMemoryCache().restore(window.__APOLLO_STATE__);

// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:8081',
//   options: {
//     reconnect: true,
//     connectionParams: {
//       authToken: 'xxx',
//     },
//   },
// });
const httpLink = createHttpLink({
  uri: 'http://localhost:8081/graphql',
});

const apolloClient = new ApolloClient({
  ssrMode: true,
  connectToDevTools: true,
  link: split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    // wsLink,
    httpLink,
    httpLink,
  ),
  cache,
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
