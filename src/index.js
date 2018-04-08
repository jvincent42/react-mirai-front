/* eslint-env browser */
import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import theme from './App/theme';
import store from './App/store';


const render = (Component) => {
  ReactDom.render(
    <AppContainer>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Component />
          </BrowserRouter>
        </Provider>
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
