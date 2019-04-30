import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Theme, IconButton, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { createStyles } from '@material-ui/styles';
import { AddCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    nav: {
      flexGrow: 1
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.common.white,
      '&:hover': {
        color: theme.palette.grey[500]
      },
    },
  }),
);

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.nav} variant="h6">
          <Link className={classes.link} to="/question">Top</Link>
        </Typography>
        <Typography variant="h6">
          <Tooltip title="Register Question">
            <Link className={classes.link} to="/add">
              <IconButton color="inherit">
                <AddCircle />
              </IconButton>
            </Link>
          </Tooltip>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
