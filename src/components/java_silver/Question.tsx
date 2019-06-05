import React, { useState, Fragment } from 'react';
import { Paper, Typography, ListItem, ListItemIcon, ListItemText, Checkbox, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, makeStyles, Theme, Button, ExpansionPanelActions, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Grow } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { ExpandMore, Check, Close, Clear, DoneOutline, Edit, Delete, Warning, Favorite } from '@material-ui/icons';
import QuestionInfo, { javaQuery } from '../util/types';
import Markdown from '../util/Markdown';
import * as firebase from 'firebase/app';
import { withRouter, RouteComponentProps } from 'react-router';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    paper: {
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
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
  item: QuestionInfo, 
}

const Question = (props: Props & RouteComponentProps) => {
  const { item, history } = props;
  const classes = useStyles();
  const [checked, setChecked] = useState<number[]>([]);
  const [errMessage, setErrMessage] = useState('');
  const [expand, setExpand] = useState(false);
  const [openAnswer, setOpenAnswer] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [fav, setFav] = useState(item.favorite);
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
    const correctIndex = item.options.reduce((arr: number[], val, i) => 
      (val.isAnswer && arr.push(i), arr), []);

    const res = checked.toString() !== correctIndex.toString();

    javaQuery.doc(item.id).update({
      answerTimes: item.answerTimes + 1,
      correctTimes: res ? item.correctTimes : item.correctTimes + 1
    })
    .then(() => {
      res ? setResult(false) : setResult(true); 
      setExpand(true);
      setOpenAnswer(true);
    })
    .catch((err) => console.log(err));
  }

  const handleClose = () => {
    setOpenDelete(false);
  }

  const handleFavorite = () => {
    javaQuery.doc(item.id).update({
      favorite: !fav
    })
    .then(() => setFav(!fav))
    .catch((err) => console.log(err));
  }

  const editorQuestion = () => {
    history.push({
      pathname: '/java/silver/' + item.id + '/edit',
      state: {
        item: item
      }
    });
  }

  const deleteQuestion = () => {
    javaQuery.doc(item.id).update({
      deleteFlg: true,
      modifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log('successfully updated');
      history.push({
        pathname: '/complete',
        state: {
          complete: true,
          action: 'Delete'
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <Grow in>
      <Paper className={classes.paper}>
        <Typography>{item.part + '-' + item.questionNo}</Typography>
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
          <ExpansionPanelActions>
            <Tooltip title="favorite">
              <IconButton onClick={handleFavorite}>
                {fav ? <Favorite color="error" />
                  : <Favorite /> }
              </IconButton>
            </Tooltip>
            <Tooltip title="edit question">
              <IconButton onClick={editorQuestion}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="delete question">
              <IconButton onClick={() => setOpenDelete(true)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </ExpansionPanelActions>
        </ExpansionPanel>
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
                {'Question' + '「' + item.part + '-' + item.questionNo + '」 delete'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>Cancel</Button>
            <Button color="primary" onClick={deleteQuestion}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Grow>
  );
};

export default withRouter(Question);
