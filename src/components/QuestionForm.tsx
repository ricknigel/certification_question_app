import React, { useState } from 'react';
import { Paper, Typography, FormControl, TextField } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Markdown from './Markdown';
import ChoicesForm from './ChoicesForm';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
  })
);

const QuestionForm = () => {
  const [input, setInput] = useState('');
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography variant="h5">
          Register
        </Typography>
        <form>
          <FormControl margin="normal" fullWidth>
            <TextField 
              label="Title"
              required
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <TextField 
              label="Question"
              required
              multiline
              onChange={e => setInput(e.target.value)}
            />
          </FormControl>
          <Markdown input={input} />
          <ChoicesForm />
        </form>
      </Paper>
    </div>
  );
};

export default QuestionForm;
