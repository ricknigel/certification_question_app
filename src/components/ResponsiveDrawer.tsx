import React from 'react';
import { Hidden, Drawer, makeStyles, SwipeableDrawer } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import MyDrawerContent from './MyDrawerContent';
import { drawerWidth } from './util/types';

const useStyles = makeStyles(() => 
  createStyles({
    drawer: {
      width: drawerWidth,
    },
  }),
);

interface Props {
  open: boolean
  onOpen: () => void
  onClose: () => void
}

const ResponsiveDrawer = (props: Props) => {
  const { open, onOpen, onClose } = props;
  const classes = useStyles();
  return (
    <nav>
      <Hidden smUp>
        <SwipeableDrawer
          classes={{
            paper: classes.drawer
          }}
          variant="temporary"
          open={open}
          onOpen={onOpen}
          onClose={onClose}
        >
          <MyDrawerContent onClose={onClose} />
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer 
          classes={{
            paper: classes.drawer
          }}
          variant="permanent" 
          open
        >
          <MyDrawerContent />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default ResponsiveDrawer;
