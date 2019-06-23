import React, { useState, Fragment } from 'react';
import { Paper, Typography, ListItem, ListItemIcon, ListItemText, Checkbox, makeStyles, Theme, Button, Grow } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { Check, Close, Clear, DoneOutline } from '@material-ui/icons';
import QuestionInfo, { javaQuery } from '../util/types';
import Markdown from '../util/Markdown';
import * as firebase from 'firebase/app';
import { withRouter, RouteComponentProps } from 'react-router';
import DeleteDialog from './DeleteDialog';
import Explanation from './Explanation';

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
    optionText: {
      wordWrap: 'break-word',
      whiteSpace: 'pre-wrap',
    },
    result: {
      textAlign: 'center',
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

    // 選択肢を昇順にソート
    checked.sort((a, b) => {
      return a - b;
    });

    const res = checked.toString() !== correctIndex.toString();

    javaQuery.doc(item.id).update({
      answerTimes: item.answerTimes + 1,
      correctTimes: res ? item.correctTimes : item.correctTimes + 1
    })
    .catch((err) => console.log(err));

    res ? setResult(false) : setResult(true); 
    setExpand(true);
    setOpenAnswer(true);
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

  const handleReport = () => {

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
            <ListItemText primary={v.optionName} className={classes.optionText} />
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
        <Explanation 
          expand={expand}
          explanation={item.explanation}
          setExpand={setExpand}
          handleReport={handleReport}
          fav={fav}
          handleFavorite={handleFavorite}
          editorQuestion={editorQuestion}
          setOpenDelete={setOpenDelete}
        />
        <DeleteDialog 
          openDelete={openDelete}
          number={'Question 「' + item.part + '-' + item.questionNo + '」 delete'}
          handleClose={handleClose}
          deleteQuestion={deleteQuestion}
        />
      </Paper>
    </Grow>
  );
};

export default withRouter(Question);
