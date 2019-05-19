import React from 'react';
import withRoot from '../withRoot';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import NotExistPage from './NotExistPage';
import CompleteAction from './CompleteAction';
import Top from './Top';
import JavaSilverTop from './java_silver/JavaSilverTop';
import QuestionCreatorForm from './java_silver/form/QuestionCreatorForm';
import QuestionList from './java_silver/QuestionList';
import QuestionEditorForm from './java_silver/form/QuestionEditorForm';
import { makeStyles, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { drawerWidth } from './util/types';
import AppFrame from './AppFrame';
import RandomQuestionList from './java_silver/RandomQuestionList';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      width: `100%`,
      [theme.breakpoints.up('sm')]: {
        marginLeft: drawerWidth,
      },
    },
  }),
);

const App = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.root}>
        <AppFrame />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" component={Top} />
            <Route exact path="/java/silver" component={JavaSilverTop} />
            <Route exact path="/java/silver/question" component={QuestionList} />
            <Route exact path="/java/silver/question/:part" component={QuestionList} />
            <Route exact path="/java/silver/randomQuestion" component={RandomQuestionList} />
            <Route exact path="/java/silver/add" component={QuestionCreatorForm} />
            <Route exact path="/java/silver/:id/edit" component={QuestionEditorForm} />
            <Route exact path="/complete" component={CompleteAction} />
            <Route exact component={NotExistPage} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default withRoot(App);
