import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const CompleteRegister = () => {
  return (
    <Paper>
      <Typography>Register Question Complete!!</Typography>
      <Link to="/add">Continue Register Question</Link>
    </Paper>
  );
};

export default CompleteRegister;
