/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import { AppContainer } from 'react-hot-loader';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import theme from './App/theme';
import store from './App/store';


const Application = ({ children }) => (
  <AppContainer>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {children}
      </Provider>
    </ThemeProvider>
  </AppContainer>
);


Application.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Application;
