import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Paper, Typography, CircularProgress } from '@material-ui/core';
import { firestore } from '../firebaseConfig';
import QuestionInfo from './util/types';

interface Props {
  id: string
}

const initial: QuestionInfo = {
  id: '',
  title: '',
  question: '',
  explanation: '',
  options: [],
  modifiedAt: '',
};

const Question = (props: RouteComponentProps<Props>) => {
  const [questionInfo, setQuestionInfo] = useState<QuestionInfo>(initial);
  const [progress, setProgress] = useState(false);
  const { id } = props.match.params;

  useEffect(() => {
    firestore.collection('java_silver').doc(id).get()
    .then((doc) => {
      setQuestionInfo({
        id: id,
        title: doc.get('title'),
        question: doc.get('question'),
        explanation: doc.get('explanation'),
        options: doc.get('options'),
        modifiedAt: doc.get('modifiedAt'),
      });
      setProgress(true);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [setProgress]);

  return (
    <div>
      {progress ?
        <Paper>
          <Typography>{questionInfo.title}</Typography>
          <Typography>{questionInfo.question}</Typography>
        </Paper>
        : <CircularProgress />
      }
    </div>
  );
};

export default Question;
