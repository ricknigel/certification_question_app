import React from 'react';
import withRoot from '../withRoot';
import Header from './Header';
import Contents from './Contents';
import QuestionForm from './QuestionForm';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Contents} />
        <Route path="/add" exact component={QuestionForm} />
      </Switch>
    </BrowserRouter>
  );
};

export default withRoot(App);
