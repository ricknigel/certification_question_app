import React, { useEffect, useState } from 'react';
import { firestore } from '../firebaseConfig';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

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

interface State {
  question: string
}

interface States {
  questions: State[]
}

const Contents = () => {
  const initialState = {
    questions: [
      {
        question: 'sample1'
      },
      {
        question: 'sample2'
      }
    ]
  }

  const [questionList, setQuestionList] = useState<States>(initialState);
  const classes = useStyles();

  // useEffect(() => {
  //   console.log('start access firebase');
  //   firestore.collection('questions').get()
  //   .then((resp) => {
  //     resp.forEach((doc) => {
  //       console.log(doc.data());
  //     });
  //   });
  // });

  // keyをしっかり指定
  return (
    <main className={classes.content}>
      {questionList.questions.map(items => (
        <Card key={items.question} className={classes.card}>
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

export default Contents;
