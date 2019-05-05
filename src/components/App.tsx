import React from 'react';
import withRoot from '../withRoot';
import Header from './Header';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import NotExistPage from './NotExistPage';
import CompleteAction from './CompleteAction';
import Top from './Top';
import JavaSilverTop from './java_silver/JavaSilverTop';
import QuestionCreatorForm from './java_silver/form/QuestionCreatorForm';
import QuestionList from './java_silver/QuestionList';
import QuestionEditorForm from './java_silver/form/QuestionEditorForm';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Top} />
        <Route exact path="/java/silver" component={JavaSilverTop} />
        <Route exact path="/java/silver/question" component={QuestionList} />
        <Route exact path="/java/silver/question/:part" component={QuestionList} />
        <Route exact path="/java/silver/add" component={QuestionCreatorForm} />
        <Route exact path="/java/silver/:id/edit" component={QuestionEditorForm} />
        <Route exact path="/complete" component={CompleteAction} />
        <Route exact component={NotExistPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default withRoot(App);
