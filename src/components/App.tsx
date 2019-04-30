import React from 'react';
import withRoot from '../withRoot';
import Header from './Header';
import QuestionList from './QuestionList';
import QuestionCreatorForm from './form/QuestionCreatorForm';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import NotExistPage from './NotExistPage';
import CompleteRegister from './CompleteRegister';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/question" exact component={QuestionList} />
        <Route path="/add" exact component={QuestionCreatorForm} />
        {/* /TODO completeは/addからの遷移のみにしたい。 */}
        <Route path="/complete" component={CompleteRegister} />
        <Route exact component={NotExistPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default withRoot(App);
