import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { ApolloProvider, getDataFromTree } from 'react-apollo';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Application from '../';
import App from '../App';


const port = 3000;
const server = express();

server.get('*', (req, res) => {
  if (req.url === '/js/bundle.js') {
    res.sendFile('bundle.js', { root: path.resolve('dist/public/js') });
  } else if (req.url === '/assets/favicon.ico') {
    res.sendFile('favicon.ico', { root: path.resolve('dist/public/assets') });
  } else {
    const apolloClient = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: 'http://localhost:8081/graphql',
        fetch,
      }),
      cache: new InMemoryCache(),
    });

    const SSRApplication = (
      <Application>
        <ApolloProvider client={apolloClient}>
          <StaticRouter location={req.url} context={{}}>
            <App />
          </StaticRouter>
        </ApolloProvider>
      </Application>
    );

    getDataFromTree(SSRApplication).then(() => {
      const sheet = new ServerStyleSheet();
      const body = renderToString(sheet.collectStyles(SSRApplication));
      const styles = sheet.getStyleTags();
      const title = 'SSR render styled-components and RR4';
      const state = apolloClient.extract();

      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>${title}</title>
            <link rel="shortcut icon" href="assets/favicon.ico" type="image/png" />
            ${styles}
          </head>
          <body>
            <div id="app">${body}</div>
            <script>
              window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')}
            </script>
            <script type="text/javascript" src="js/bundle.js"></script>
          </body>
        </html>
      `);
    });
  }
});


server.listen(port, () => {
  console.info(`Application served at => http://localhost:${port}`);
});
