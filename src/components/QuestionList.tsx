import React, { useEffect, useState } from 'react';
import { firestore } from '../firebaseConfig';
import { CircularProgress } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Question from './Question';
import QuestionInfo from './util/types';

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
  }),
);

const QuestionList = () => {
  const [questionList, setQuestionList] = useState<QuestionInfo[]>([]);
  const [progress, setProgress] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    firestore.collection('java_silver').limit(10).get()
    .then((resp) => {
      resp.forEach((doc) => {
        const addQuestion: QuestionInfo = {
          id: doc.id,
          title: doc.get('title'),
          question: doc.get('question'),
          explanation: doc.get('explanation'),
          options: doc.get('options'),
          modifiedAt: doc.get('modifiedAt'),
        }
        setQuestionList((prev) => [...prev, addQuestion]);
      });
      setProgress(true);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [setQuestionList]);

  return (
    <main className={classes.content}>
      {progress ? 
        questionList.map(item => (
          <Question key={item.id} item={item} />
        ))
        : <CircularProgress />
      }
    </main>
  );
};

export default QuestionList;
