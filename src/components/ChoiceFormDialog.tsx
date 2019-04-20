import React, { useState } from 'react';
import { Dialog, TextField, Button, Checkbox, DialogContent, DialogActions, DialogTitle, FormControlLabel, makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

export interface ChoiceInfo {
  content: string,
  isAnswer: boolean
}

interface Props {
  open: boolean,
  setOpen: (open: boolean) => void,
  onClose: (choiceInfo: ChoiceInfo) => void
}

const useStyles = makeStyles(() => 
  createStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

const ChoiceFormDialog = (props: Props) => {
  const { open, onClose, setOpen } = props;
  const classes = useStyles();
  const [content, setContent] = useState('');
  const [isAnswer, setIsAnswer] = useState(false);

  const choiseInfo = {
    content: content,
    isAnswer: isAnswer
  }

  const setInitialState = () => {
    setContent('');
    setIsAnswer(false);
  }

  const handleClose = () => {
    setInitialState();
    setOpen(false);
  };

  const handleSave = (choiceInfo: ChoiceInfo) => {
    if (content) {
      setInitialState();
      onClose(choiceInfo);
    }
    //TODO handle error 
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        ChoiceForm
      </DialogTitle>
      <DialogContent className={classes.form}>
        <TextField 
          autoFocus
          required
          label="ChoiceContent" 
          onChange={(e) => setContent(e.target.value)}
        />
        <FormControlLabel 
          control={<Checkbox checked={isAnswer} onChange={() => setIsAnswer(!isAnswer)}/>} 
          label="isAnswer"
        />
      </DialogContent>
      <DialogActions>
        <Button 
          size="small" 
          variant="outlined"
          color="secondary"
          onClick={() => handleSave(choiseInfo)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChoiceFormDialog;
