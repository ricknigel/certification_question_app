import React, { useState } from 'react';
import { Dialog, TextField, Button, Checkbox, DialogContent, DialogActions, DialogTitle, FormControlLabel, makeStyles, Typography, IconButton, Tooltip } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { Close } from '@material-ui/icons';
import { OptionInfo } from '../../util/types';

interface Props {
  open: boolean,
  option?: OptionInfo,
  setOpen: (open: boolean) => void,
  onClose: (optionInfo: OptionInfo, index?: number) => void
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
  const { open, option, setOpen, onClose } = props;
  const classes = useStyles();
  const [optionName, setOptionName] = useState(option ? option.optionName : '');
  const [isAnswer, setIsAnswer] = useState(option ? option.isAnswer : false);
  const [message, setMessage] = useState('');

  const optionInfo = {
    optionName: optionName,
    isAnswer: isAnswer
  }

  const setInitialState = () => {
    setOptionName('');
    setIsAnswer(false);
  }

  const handleClose = () => {
    setInitialState();
    setOpen(false);
  };

  const handleSave = (optionInfo: OptionInfo) => {
    if (!optionName) {
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
          multiline
          error={optionName ? false : true}
          label="OptionName"
          value={optionName}
          onChange={(e) => setOptionName(e.target.value)}
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
