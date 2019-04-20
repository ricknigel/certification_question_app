import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography>
          <Link to="/">TOP</Link>
        </Typography>
        <Typography>
          <Link to="/add">Add</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
