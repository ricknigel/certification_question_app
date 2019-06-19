import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles, Theme, CircularProgress, Fab } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import QuestionInfo, { generateRandom, PER_PAGE, javaQuery, getZeroOrOne } from '../util/types';
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

  const handleLoadQuestion = () => {
    setMorePro(false);
    setQuestionList([]);
    getQuestion(makeSortQuery())
    .then(() => {
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
            favorite: doc.get('favorite'),
          }
          addQuestionList.push(addQuestion);
        });
        setQuestionList(() => addQuestionList);
        resolve(resp.size);
      })
      .catch(err => console.log(err));
    })
  }

  const makeSortQuery = () => {
    const operation = getZeroOrOne() === 0 ? '<' : '>';
    return javaQuery.where('random', operation, generateRandom());
  }

  const updateRandom = useCallback(() => {
    questionList.map(item => (
      javaQuery.doc(item.id).update({
        random: generateRandom()
      })
      .catch(err => console.log(err))
    ));
  }, [questionList]);

  useEffect(() => {
    setProgress(false);
    getQuestion(makeSortQuery())
    .then(() => {
      setProgress(true);
      setMorePro(true);
    })
    .catch(err => console.log(err));
  }, [setQuestionList]);

  useEffect(() => {
    questionList.length !== 0 && updateRandom();
  }, [questionList, updateRandom]);

  return (
    <div className={classes.content}>
      { progress ? 
        <div className={classes.flex}>
          {questionList.map(item => (
            <Question key={item.id} item={item} />
          ))}
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
