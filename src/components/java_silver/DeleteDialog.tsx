import React from 'react';
import { Dialog, DialogTitle, Typography, IconButton, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';
import { Close, Warning } from '@material-ui/icons';
import { createStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => 
  createStyles({
    dialog: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dialogText: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
  }),
);

interface Props {
  openDelete: boolean,
  number: string,
  handleClose: () => void,
  deleteQuestion: () => void,
}

const DeleteDialog = (props: Props) => {
  const { openDelete, number, handleClose, deleteQuestion } = props;
  const classes = useStyles();
  return (
    <Dialog open={openDelete} onClick={handleClose}>
      <DialogTitle>
        <div className={classes.dialog}>
          <Typography variant="h6">Delete Question</Typography>
          <IconButton size="small" onClick={handleClose}>
            <Close />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent className={classes.dialogText}>
        <Warning color="error" />
        <Typography color="error">
            {number}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>Cancel</Button>
        <Button color="primary" onClick={deleteQuestion}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
