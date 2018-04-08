/* eslint-env browser */
import React from 'react';
import ReactDom from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { AppContainer } from 'react-hot-loader';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router } from 'react-router-dom';

import App from './App';
import theme from './App/theme';


const history = createBrowserHistory();

const render = (Component) => {
  ReactDom.render(
    <AppContainer>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Component />
        </Router>
      </ThemeProvider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

render(App);


if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
    // eslint-disable-next-line global-require
    render(require('./App'));
  });
}
