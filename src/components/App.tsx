import React from 'react';
import withRoot from '../withRoot';
import Header from './Header';
import QuestionList from './QuestionList';
import QuestionCreatorForm from './form/QuestionCreatorForm';
import Question from './Question';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={QuestionList} />
        <Route path="/add" exact component={QuestionCreatorForm} />
        {/* <Route path="/question/:id" exact component={Question} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default withRoot(App);
