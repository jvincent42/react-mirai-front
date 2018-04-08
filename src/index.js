/* eslint-env browser */
import React from 'react';
import ReactDom from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { AppContainer } from 'react-hot-loader';

import App from './App';
import theme from './App/theme';


const render = (Component) => {
  ReactDom.render(
    <AppContainer>
      <ThemeProvider theme={theme}>
        <Component />
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
