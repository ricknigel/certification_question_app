import React, { useState, useCallback } from 'react';
import { Paper, Typography, FormControl, TextField, Button, InputLabel, Select, MenuItem, OutlinedInput } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import * as firebase from 'firebase/app';
import OptionList from './OptionList';
import { withRouter } from 'react-router';
import Markdown from '../../util/Markdown';
import QuestionInfo, { OptionInfo, PartsSelection } from '../../util/types';
import { firestore } from '../../../firebaseConfig';
import * as H from 'history';

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

interface Props {
  location: H.Location<{
    item: QuestionInfo
  }>,
  history: H.History
}

const QuestionEditorForm = (props: Props) => {
  const { history } = props;
  const { item } = props.location.state;
  const [part, setPart] = useState(item.part);
  const [questionNo, setQuestionNo] = useState(item.questionNo);
  const [title, setTitle] = useState(item.title);
  const [question, setQuestion] = useState(item.question);
  const [explanation, setExplanation] = useState(item.explanation);
  const [options, setOptions] = useState<OptionInfo[]>(item.options);
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

    firestore.collection('java_silver').doc(item.id).update({
      part: part,
      questionNo: questionNo,
      title: title,
      question: question,
      explanation: explanation,
      options: options,
      modifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      history.push({
        pathname: '/complete',
        state: { 
          complete: true,
          action: 'Edit'
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
        Editor Question
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
            {PartsSelection.map((value, index) => (
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
            value={questionNo}
            variant="outlined"
            onChange={e => setQuestionNo(parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <TextField 
            label="Title"
            required
            error={title ? false : true}
            value={title}
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
            value={question}
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
            value={explanation}
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

export default withRouter(QuestionEditorForm);
