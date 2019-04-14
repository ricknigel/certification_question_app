import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography>
          TOP
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
