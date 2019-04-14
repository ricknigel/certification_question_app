import React, { useEffect, useState } from 'react';
import { firestore } from '../firebaseConfig';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    card: {
      width: 500,
      margin: '30px auto'
    }
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
    <div className={classes.card}>
      {questionList.questions.map(items => (
        <Card key={items.question}>
          <CardContent>
            <Typography>
              {items.question}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Contents;
