import React, { ComponentType } from 'react';
import { ThemeProvider } from '@material-ui/styles/';
import CssBaseline from '@material-ui/core/CssBaseline';
import { red, blue } from '@material-ui/core/colors';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[100],
      main: blue[200],
      dark: blue[500],
    },
    secondary: {
      light: red[500],
      main: red[300],
      dark: red[600],
    },
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
