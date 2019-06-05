import React, { useState, useCallback } from 'react';
import { Paper, Typography, FormControl, TextField, Button, InputLabel, Select, MenuItem, OutlinedInput } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import * as firebase from 'firebase/app';
import OptionList from './OptionList';
import { withRouter, RouteComponentProps } from 'react-router';
import Markdown from '../../util/Markdown';
import { OptionInfo, JavaParts, generateRandom, javaQuery } from '../../util/types';

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
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    sendButton: {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }),
);

const QuestionCreatorForm = (props: RouteComponentProps) => {
  const { history } = props;
  const [part, setPart] = useState(1);
  const [questionNo, setQuestionNo] = useState(0);
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [explanation, setExplanation] = useState('');
  const [options, setOptions] = useState<OptionInfo[]>([]);
  const [message, setMessage] = useState('');
  const classes = useStyles();

  // TODO [...prev, add]に修正必要?
  const addOptions = useCallback((add: OptionInfo[]) => {
    setOptions(() => [...add]);
  }, [setOptions]);

  const registerQuestion = () => {
    //TODO: Error Handle
    if (!part || questionNo === 0 || !title || !question || !explanation || options.length === 0) {
      setMessage('exist empty field');
      return
    }

    javaQuery.add({
      part: part,
      questionNo: questionNo,
      title: title,
      question: question,
      explanation: explanation,
      options: options,
      deleteFlg: false,
      answerTimes: 0,
      correctTimes: 0,
      random: generateRandom(),
      favorite: true, // TODO: 今だけtrue 追加完了後にfalseに要修正
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      modifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      history.push({
        pathname: '/complete',
        state: { 
          complete: true,
          action: 'Register'
        },
      });
    })
    .catch((error) => {
      console.log(error);
      setMessage('failure register');
    });
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4">
        Register Question
      </Typography>
      <Typography color="error">{message}</Typography>
      <form>
        <FormControl required variant="outlined" margin="normal">
          <InputLabel>Part</InputLabel>
          <Select 
            value={part} 
            onChange={e => setPart(parseInt(e.target.value))}
            input={<OutlinedInput labelWidth={100} />}
          >
            {JavaParts.map((value, index) => (
              <MenuItem key={index} value={value.part}>{value.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl margin="normal" className={classes.textField}>
          <TextField 
            type="number"
            label="Question No"
            required
            autoFocus
            error={questionNo !== 0 ? false : true}
            variant="outlined"
            onChange={e => setQuestionNo(parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <TextField 
            label="Title"
            required
            error={title ? false : true}
            variant="outlined"
            onChange={e => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <TextField 
            label="Question(Markdown)"
            required
            multiline
            error={question ? false : true}
            variant="outlined"
            rows="4"
            onChange={e => setQuestion(e.target.value)}
          />
        </FormControl>
        { question && <Markdown title="Question Preview" input={question} />}
        <OptionList addOptions={addOptions} options={options} />
        <FormControl margin="normal" fullWidth>
          <TextField 
            label="Explanation(Markdown)"
            required
            multiline
            error={explanation ? false : true}
            variant="outlined"
            rows="4"
            onChange={e => setExplanation(e.target.value)}
          />
        </FormControl>
        { explanation && <Markdown title="Explanation Preview" input={explanation} />}
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

export default withRouter(QuestionCreatorForm);
