import React from 'react';
import withRoot from '../withRoot';
import Header from './Header';
import Contents from './Contents';

const App = () => {
  return (
    <div>
      <Header />
      <Contents />
    </div>
  );
};

export default withRoot(App);
