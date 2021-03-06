import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@material-ui/core';
import { JavaParts } from '../util/types';

const JavaSilverTop = () => {
  return (
      <div>
        <Card>
          <Link to="/java/silver/randomQuestion">Random Question List</Link>
        </Card>
        {JavaParts.map(v => 
          <Card key={v.part}>
            <Link to={'/java/silver/question/' + v.part }>{v.name}</Link>
          </Card>)}
        <Link to="/java/silver/add">add question</Link>
      </div>
  );
};

export default JavaSilverTop;
