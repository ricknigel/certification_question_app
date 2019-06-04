import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, CircularProgress, Paper, Fab } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { firestore } from '../../firebaseConfig';
import QuestionInfo, { generateRandom, PER_PAGE } from '../util/types';
import Question from './Question';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    content: {
      width: 'auto',
      marginTop: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
      },
    },
    flex: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    moreButton: {
      marginTop: theme.spacing(2),
    },
  }),
);

const RandomQuestionList = () => {
  const classes = useStyles();
  const [questionList, setQuestionList] = useState<QuestionInfo[]>([]);
  const [progress, setProgress] = useState(false);
  const [morePro, setMorePro] = useState(false);
  const query = firestore.collection('java_silver');

  useEffect(() => {
    setProgress(false);
    getQuestion(makeSortQuery())
    .then((result) => {
      setProgress(true);
      setMorePro(true);
    })
    .catch((err) => console.log(err));
  }, [setQuestionList]);

  useEffect(() => {
    questionList.length !== 0 && updateRandom();
  }, [questionList]);

  const handleLoadQuestion = () => {
    setMorePro(false);
    setQuestionList([]);
    getQuestion(makeSortQuery())
    .then((result) => {
      setProgress(true);
      setMorePro(true);
    })
    .catch((err) => console.log(err));
  }

  const getQuestion = (argQuery: firebase.firestore.Query) => {
    return new Promise((resolve) => {
      argQuery.limit(PER_PAGE).get()
      .then((resp) => {
        let addQuestionList: QuestionInfo[] = [];
        resp.forEach((doc) => {
          const addQuestion: QuestionInfo = {
            id: doc.id,
            part: doc.get('part'),
            questionNo: doc.get('questionNo'),
            title: doc.get('title'),
            question: doc.get('question'),
            explanation: doc.get('explanation'),
            options: doc.get('options'),
            modifiedAt: doc.get('modifiedAt'),
            answerTimes: doc.get('answerTimes'),
            correctTimes: doc.get('correctTimes'),
            favorite: doc.get('favorite')
          }
          addQuestionList.push(addQuestion);
        });
        setQuestionList(() => addQuestionList);
        resolve(resp.size);
      })
      .catch((err) => {
        console.log(err);
      });
    })
  }

  const makeSortQuery = () => {
    let sortQuery = getZeroOrOne() === 0 ? query.orderBy('random', 'asc') : query.orderBy('random', 'desc');
    sortQuery = getZeroOrOne() === 0 ? sortQuery.startAt(generateRandom()) : sortQuery.endAt(generateRandom());

    return sortQuery;
  }

  const getZeroOrOne = () => {
    return Math.floor(Math.random() * 2);
  }

  const updateRandom = () => {
    questionList.map(item => (
      query.doc(item.id).update({
        random: generateRandom()
      })
      .catch((err) => {
        console.log(err);
      })
    ));
  }

  return (
    <div className={classes.content}>
      { progress ? 
        <div className={classes.flex}>
          <Paper>
            {questionList.map(item => (
              <Question key={item.id} item={item} />
            ))}
          </Paper>
          <Fab 
            className={classes.moreButton}
            variant="extended"
            onClick={handleLoadQuestion}
          >
            { morePro ? 'More Question' : <CircularProgress size={24} /> }
          </Fab>
        </div>
        : <CircularProgress /> }
    </div>
  );
};

export default RandomQuestionList;
