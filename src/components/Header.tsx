import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Theme, IconButton, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { createStyles } from '@material-ui/styles';
import { AddCircle, Home, Menu } from '@material-ui/icons';
import { drawerWidth } from './util/types';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    appbar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    menuBtn: {
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    grow: {
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

interface Props {
  onOpen: () => void
}

const Header = (props: Props) => {
  const { onOpen } = props;
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appbar}>
      <Toolbar>
        <Typography variant="h6">
          <IconButton 
            color="inherit"
            className={classes.menuBtn}
            onClick={onOpen}
          >
            <Menu />
          </IconButton>
          <Tooltip title="home">
            <Link className={classes.link} to="/">
              <IconButton color="inherit">
                <Home />
              </IconButton>
            </Link>
          </Tooltip>
        </Typography>
        <Typography noWrap variant="h6">
          Certification Question
        </Typography>
        <div className={classes.grow}></div>
        <Typography variant="h6">
          <Tooltip title="Register Question">
            <Link className={classes.link} to="/java/silver/add">
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
