import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@material-ui/core';
import { PartsSelection } from '../util/types';
import { firestore } from '../../firebaseConfig';

const JavaSilverTop = () => {
  return (
      <div>
        <Card>
          <Link to="/java/silver/question">Question List</Link>
        </Card>
        {PartsSelection.map(v => <Card key={v.part}><Link to="/">{v.name}</Link></Card>)}
        <Link to="/java/silver/add">add question</Link>
      </div>
  );
};

export default JavaSilverTop;
