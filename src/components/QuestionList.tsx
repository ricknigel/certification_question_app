import React, { useEffect, useState } from 'react';
import { firestore } from '../firebaseConfig';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { OptionInfo } from './form/QuestionCreatorForm';

const sampleQuestion = {
  questions: [
    {
      id: 'afaafacsac',
      title: 'sample',
      question: 'sample question',
      explanation: 'sample explanation',
      options: [
        {
          option: 'content1',
          isAnswer: false
        },
        {
          option: 'content2',
          isAnswer: false
        },
        {
          option: 'content3',
          isAnswer: true
        },
        {
          option: 'content4',
          isAnswer: false
        },
      ],
    },
  ],
}

interface QuestionState {
  id: string
  title: string,
  question: string,
  explanation: string,
  options: OptionInfo[]
}

interface QuestionsState {
  questions: QuestionState[]
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    content: {
      width: 'auto',
      marginLeft: theme.spacing(8 * 3),
      marginRight: theme.spacing(8 * 3),
      [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    card: {
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
  }),
);

const QuestionList = () => {

  const [questionList, setQuestionList] = useState<QuestionsState>(sampleQuestion);
  const classes = useStyles();

  useEffect(() => {
    console.log('start access firebase');
    firestore.collection('questions').get()
    .then((resp) => {
      resp.forEach((doc) => {
        console.log(doc.id);
        console.log(doc.data());
      });
    })
    .catch((err) => {
      console.log(err);
    });
  });

  // keyをしっかり指定
  return (
    <main className={classes.content}>
      {questionList.questions.map(items => (
        <Card key={items.id} className={classes.card}>
          <CardContent>
            <Typography>
              {items.question}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </main>
  );
};

export default QuestionList;
