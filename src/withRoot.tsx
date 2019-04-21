import React, { ComponentType } from 'react';
import { ThemeProvider } from '@material-ui/styles/';
import CssBaseline from '@material-ui/core/CssBaseline';
import { red, blue, green } from '@material-ui/core/colors';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[100],
      main: blue[500],
      dark: blue[900],
    },
    secondary: {
      light: green[100],
      main: green[500],
      dark: green[900],
    },
    error: {
      light: red[500],
      main: red[300],
      dark: red[600],
    }
  },
});

const withRoot = function<P> (Component: ComponentType<P>) {
  const WithRoot = (props: P) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...props} />
    </ThemeProvider>
  );

  return WithRoot;
};

export default withRoot;
