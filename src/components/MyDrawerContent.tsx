import React, { useState } from 'react';
import { makeStyles, Theme, Divider, List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { CertificationSubject, drawerWidth } from './util/types';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    toolbar: theme.mixins.toolbar,
    drawer: {
      width: drawerWidth,
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.grey[800],
    },
    nasted: {
      paddingLeft: theme.spacing(4),
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
            <Link to={'/java/silver/randomQuestion'} className={classes.link}>
              <ListItem button className={classes.nasted} onClick={onClose}>
                {'Random Question'}
              </ListItem>
            </Link>
            {v.children.map((v) => (
              <Link 
                key={v.part}
                to={'/java/silver/question/' + v.part}
                className={classes.link}
              >
                <ListItem  
                  button 
                  className={classes.nasted}
                  onClick={onClose} 
                >
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
