import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import * as H from 'history';

interface Props {
  location: H.Location<{ 
    complete: boolean,
    action: string
  }>
}

const CompleteAction = (props: Props) => {
  const { complete, action } = props.location.state;
  return (
    <div>
      { complete ? 
        <Paper>
          <Typography>{action} Question Complete!!</Typography>
          <Link to="/java/silver/">Go Java QuestionList</Link>
        </Paper>
        : <Redirect to="/" /> }
    </div>
  );
};

export default CompleteAction;
