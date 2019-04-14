import React, { ComponentType } from 'react';
import { ThemeProvider } from '@material-ui/styles/';
import CssBaseline from '@material-ui/core/CssBaseline';
import { blue, grey } from '@material-ui/core/colors';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[100],
      main: blue[50],
      dark: blue[100],
    },
    secondary: {
      light: grey[500],
      main: grey[900],
      dark: grey[900],
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
