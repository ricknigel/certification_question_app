import React, { useEffect, useState } from 'react';
import { CircularProgress, Paper, Fab } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Question from './Question';
import QuestionInfo from '../util/types';
import { firestore } from '../../firebaseConfig';

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
  const [count, setCount] = useState(0);
  // useEffect内で更新しないように初期値はpageが10以下でも10とする
  const [page, setPage] = useState(10);
  const [progress, setProgress] = useState(false);
  const classes = useStyles();
  const PER_PAGE = 10;

  useEffect(() => {
    firestore.collection('java_silver').where('deleteFlg', '==', false).get()
    .then((resp) => {
      setCount(resp.size);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [setCount]);

  useEffect(() => {
    let query = firestore.collection('java_silver').where('deleteFlg', '==', false).orderBy('part').orderBy('questionNo');

    if (page > PER_PAGE) {
      const lastArray = questionList[questionList.length - 1];
      query = query.startAfter(lastArray.part, lastArray.questionNo);
    }

    query.limit(PER_PAGE).get()
    .then((resp) => {
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
        }
        setQuestionList((prev) => [...prev, addQuestion]);
      });
      setProgress(true);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [page, setQuestionList]);

  const handleLoadQuestion = () => {
    const newPage = count - page > PER_PAGE ? page + PER_PAGE : count;
    setPage(newPage);
  };

  return (
    <main className={classes.content}>
      {progress ? 
        <div>
          <Paper>
            {questionList.map(item => (
              <Question key={item.id} item={item} />
            ))}
          </Paper>
          { count >= PER_PAGE && page !== count &&
            <Fab variant="extended" onClick={handleLoadQuestion}>
              { progress ? 'More Question' : <CircularProgress /> }
            </Fab>
          }
        </div>
        : <CircularProgress />
      }
    </main>
  );
};

export default QuestionList;
