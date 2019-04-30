import React, { useState, Fragment } from 'react';
import { Paper, Typography, ListItem, ListItemIcon, ListItemText, Checkbox, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, makeStyles, Theme, Button } from '@material-ui/core';
import Markdown from './util/Markdown';
import QuestionInfo from './util/types';
import { createStyles } from '@material-ui/styles';
import { ExpandMore, Check, Close, Clear, DoneOutline } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    paper: {
      marginBottom: theme.spacing(3),
    },
    button: {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: 'flex',
      justifyContent: 'flex-end',
    },
    result: {
      textAlign: 'center',
    },
  }),
);

interface Props {
  item: QuestionInfo
}

const Question = (props: Props) => {
  const { item } = props;
  const classes = useStyles();
  const [checked, setChecked] = useState<number[]>([]);
  const [errMessage, setErrMessage] = useState('');
  const [expand, setExpand] = useState(false);
  const [openAnswer, setOpenAnswer] = useState(false);
  const [result, setResult] = useState(false);

  const handleSelect = (index: number) => () => {
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];

    currentIndex === -1 ? newChecked.push(index) : newChecked.splice(currentIndex, 1);

    setChecked(newChecked);
  }

  const sendAnswer = () => {
    if (checked.length === 0) {
      setErrMessage('please select answer');
      return;
    }

    setErrMessage('');
    setExpand(true);
    setOpenAnswer(true);
    const correctIndex = item.options.reduce((arr: number[], val, i) => 
      (val.isAnswer && arr.push(i), arr), []);

    checked.toString() !== correctIndex.toString() ? setResult(false) : setResult(true);
  }

  return (
    <Paper className={classes.paper}>
      <Markdown title={item.title} input={item.question} />
      <Typography color="error">{errMessage}</Typography>
      {item.options.map((v, i) => (
        <ListItem key={i} dense button onClick={handleSelect(i)}>
          <ListItemIcon>
            <Checkbox checked={checked.indexOf(i) !== -1} />
          </ListItemIcon>
          <Typography variant="h6">{i + 1}</Typography>
          <ListItemText primary={v.optionName} />
          <ListItemIcon>
            { openAnswer ? v.isAnswer ? <Check color="secondary" /> : <Close color="error" /> : <></>}
          </ListItemIcon>
        </ListItem>
      ))}
      <div className={classes.button}>
        <Button 
          size="medium" 
          color="primary" 
          variant="outlined"
          onClick={sendAnswer}
        >
          Answer
        </Button>
      </div>
      { openAnswer &&
        <div className={classes.result}>
          {result ? 
            <Fragment>
              <Typography variant="h6" color="secondary">
                <DoneOutline color="secondary" />
                Correct!!
              </Typography>
            </Fragment> 
            : 
            <Fragment>
              <Typography variant="h6" color="error">
                <Clear color="error" />
                Not Correct
              </Typography>
            </Fragment> }
        </div> }
      <ExpansionPanel expanded={expand}>
        <ExpansionPanelSummary 
          expandIcon={<ExpandMore />}
          onClick={() => setExpand(!expand)}
        >
          Explanation
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Markdown input={item.explanation} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  );
};

export default Question;
