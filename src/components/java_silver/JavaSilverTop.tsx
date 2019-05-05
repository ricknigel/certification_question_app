import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@material-ui/core';
import { PartsSelection } from '../util/types';

const JavaSilverTop = () => {
  return (
      <div>
        <Card>
          <Link to="/java/silver/question">Question List</Link>
        </Card>
        {PartsSelection.map(v => 
          <Card key={v.part}>
            <Link to={'/java/silver/question/' + v.part }>{v.name}</Link>
          </Card>)}
        <Link to="/java/silver/add">add question</Link>
      </div>
  );
};

export default JavaSilverTop;
