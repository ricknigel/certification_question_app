import React, { useEffect, useState } from 'react';
import { CircularProgress, Paper, Fab } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Question from './Question';
import QuestionInfo from '../util/types';
import { firestore } from '../../firebaseConfig';
import { match } from 'react-router';

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

interface Props {
  match: match<{part: string}>
}

const PartQuestionList = (props: Props) => {
  const { part } = props.match.params;
  const PER_PAGE = 10;
  const [questionList, setQuestionList] = useState<QuestionInfo[]>([]);
  const [count, setCount] = useState(0);
  // useEffect内で更新しないように初期値はpageが10以下でも10とする
  const [page, setPage] = useState(PER_PAGE);
  const [progress, setProgress] = useState(false);
  const [morePro, setMorePro] = useState(false);
  const classes = useStyles();
  const query = firestore.collection('java_silver').where('deleteFlg', '==', false).where('part', '==', parseInt(part)).orderBy('questionNo');

  useEffect(() => {
    setProgress(false);
    // initialize
    setPage(PER_PAGE);
    setQuestionList([]);

    query.get()
    .then((resp) => {
      setCount(resp.size);
    })
    .catch((err) => {
      console.log(err);
    });

    getQuestion(query);
  }, [part, setQuestionList, setCount]);

  const handleLoadQuestion = () => {
    const newPage = count - page > PER_PAGE ? page + PER_PAGE : count;
    setMorePro(false);
    setPage(newPage);
    const lastArray = questionList[questionList.length - 1];

    getQuestion(query.startAfter(lastArray.questionNo));
  };

  const getQuestion = (argQuery: firebase.firestore.Query) => {
    argQuery.limit(PER_PAGE).get()
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
          answerTimes: doc.get('answerTimes'),
          correctTimes: doc.get('correctTimes'),
          favorite: doc.get('favorite')
        }
        setQuestionList((prev) => [...prev, addQuestion]);
      });
      setProgress(true);
      setMorePro(true);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className={classes.content}>
      { progress ? 
        <div className={classes.flex}>
          { questionList.length !== 0 ?
          <Paper>
            {questionList.map(item => (
              <Question key={item.id} item={item} />
            ))}
          </Paper> : <p>Nothing Register Question</p> }
          { count >= PER_PAGE && page !== count &&
            <Fab 
              className={classes.moreButton}
              variant="extended" 
              onClick={handleLoadQuestion}
            >
              { morePro ? 'More Question' : <CircularProgress size={24} /> }
            </Fab> }
        </div>
        : <CircularProgress /> }
    </div>
  );
};

export default PartQuestionList;
