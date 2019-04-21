import React, { useState, useCallback } from 'react';
import { Paper, Typography, FormControl, TextField, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import * as firebase from 'firebase/app';
import { firestore } from '../../firebaseConfig';
import Markdown from '../util/Markdown';
import OptionList from './OptionList';

export interface OptionInfo {
  option: string,
  isAnswer: boolean
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    paper: {
      width: 'auto',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    sendButton: {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }),
);

const QuestionCreatorForm = () => {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [explanation, setExplanation] = useState('');
  const [options, setOptions] = useState<OptionInfo[]>([]);
  const [message, setMessage] = useState('');
  const classes = useStyles();

  const addOptions = useCallback((add: OptionInfo[]) => {
    setOptions(() => [...add]);
  }, [options]);

  const registerQuestion = () => {
    //TODO: Error Handle
    if (!title || !question || !explanation || options.length === 0) {
      setMessage('exist empty field');
      return
    }

    firestore.collection('questions').add({
      title: title,
      question: question,
      explanation: explanation,
      options: options,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      modifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((doc) => {
      console.log(doc);
      setMessage('done register question');
    })
    .catch((error) => {
      console.log(error);
      setMessage('failure register question');
    });
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4">
        Register Question
      </Typography>
      <Typography color="error">{message}</Typography>
      <form>
        <FormControl margin="normal" fullWidth>
          <TextField 
            label="Title"
            required
            autoFocus
            error={title ? false : true}
            variant="outlined"
            onChange={e => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <TextField 
            label="Question"
            required
            multiline
            error={question ? false : true}
            variant="outlined"
            rows="4"
            onChange={e => setQuestion(e.target.value)}
          />
        </FormControl>
        { question && <Markdown input={question} />}
        <FormControl margin="normal" fullWidth>
          <TextField 
            label="Explanation"
            required
            multiline
            error={explanation ? false : true}
            variant="outlined"
            rows="4"
            onChange={e => setExplanation(e.target.value)}
          />
        </FormControl>
        { explanation && <Markdown input={explanation} />}
        <OptionList addOptions={addOptions} options={options} />
        <div className={classes.sendButton}>
          <Button 
            size="large" 
            color="primary" 
            variant="outlined"
            onClick={registerQuestion}
          >
            Send
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default QuestionCreatorForm;
