/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import { AppContainer } from 'react-hot-loader';
import { ThemeProvider } from 'styled-components';

import theme from './App/theme';


const Application = ({ children }) => (
  <AppContainer>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </AppContainer>
);


Application.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Application;
