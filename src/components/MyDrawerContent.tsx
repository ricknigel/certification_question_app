import React, { useState } from 'react';
import { makeStyles, Theme, Divider, List, ListItem, ListItemText, Typography, Collapse } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { CertificationSubject, drawerWidth } from './util/types';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    toolbar: theme.mixins.toolbar,
    drawer: {
      width: drawerWidth,
    },
  }),
);

interface Props {
  onClose?: () => void
}

const MyDrawerContent = (props: Props) => {
  const { onClose } = props;
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <div className={classes.toolbar}>
        <Typography>Drawer</Typography>
      </div>
      <Divider />
      {CertificationSubject.map((v) => (
        <List key={v.subId}>
          <ListItem button >
            <ListItemText onClick={() => setMenuOpen(!menuOpen)}>
              {v.name}
            </ListItemText>
          </ListItem> 
          <Collapse in={menuOpen} unmountOnExit>
            {v.children.map((v) => (
              <Link key={v.part} to={'/java/silver/question/' + v.part}>
                <ListItem button onClick={onClose}>
                  {v.name}
                </ListItem>
              </Link>
              ))}
          </Collapse>
        </List>
      ))}
    </div>
  );
};

export default MyDrawerContent;
