import React, { useState } from 'react';
import { Dialog, TextField, Button, Checkbox, DialogContent, DialogActions, DialogTitle, FormControlLabel, makeStyles, Typography, IconButton, Tooltip } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { Close } from '@material-ui/icons';
import { OptionInfo } from './QuestionCreatorForm';

interface Props {
  open: boolean,
  setOpen: (open: boolean) => void,
  onClose: (optionInfo: OptionInfo) => void
}

const useStyles = makeStyles(() => 
  createStyles({
    title: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

const OptionFormDialog = (props: Props) => {
  const { open, onClose, setOpen } = props;
  const classes = useStyles();
  const [option, setOption] = useState('');
  const [isAnswer, setIsAnswer] = useState(false);
  const [message, setMessage] = useState('');

  const optionInfo = {
    option: option,
    isAnswer: isAnswer
  }

  const setInitialState = () => {
    setOption('');
    setIsAnswer(false);
  }

  const handleClose = () => {
    setInitialState();
    setOpen(false);
  };

  const handleSave = (optionInfo: OptionInfo) => {
    if (!option) {
      setMessage('option is empty');
      return
    }
    setInitialState();
    onClose(optionInfo);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <div className={classes.title}>
          <Typography variant="h5">
            Option
          </Typography>
          <Tooltip title="Cancel">
            <IconButton
              size="small"
              onClick={handleClose}
            >
              <Close />
            </IconButton>
          </Tooltip>
        </div>
      </DialogTitle>
      <DialogContent className={classes.form}>
        <Typography color="error">{message}</Typography>
        <TextField 
          autoFocus
          required
          error={option ? false : true}
          label="Option" 
          onChange={(e) => setOption(e.target.value)}
        />
        <FormControlLabel 
          control={<Checkbox checked={isAnswer} onChange={() => setIsAnswer(!isAnswer)}/>} 
          label="Answer"
        />
      </DialogContent>
      <DialogActions>
        <Button 
          size="small" 
          color="primary"
          variant="outlined"
          onClick={() => handleSave(optionInfo)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OptionFormDialog;
