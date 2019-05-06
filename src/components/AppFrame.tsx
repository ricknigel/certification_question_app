import React, { Fragment, useState, useCallback } from 'react';
import Header from './Header';
import ResponsiveDrawer from './ResponsiveDrawer';

const AppFrame = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  return (
    <Fragment>
      <Header onOpen={handleDrawerOpen} />
      <ResponsiveDrawer
        open={open} 
        onOpen={handleDrawerOpen} 
        onClose={handleDrawerClose} 
      />
    </Fragment>
  );
};

export default AppFrame;
