import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, makeStyles, Theme, Card, CardContent, Grid } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    top: {
      padding: theme.spacing(3),
    },
  }),
);

const Top = () => {
  const classes = useStyles();
  return (
    <div className={classes.top}>
      <Typography align="center" variant="h3">CerQue</Typography>
      <Typography align="center" color="textSecondary">Certification Question App</Typography>
      <Grid container>
        <Grid>
          <CardContent>
            <Typography>Certificatoin List</Typography>
            <li>
              <Link to="/java/silver">Java Silver</Link>
            </li>
            <li>
              AP(plan)
            </li>
          </CardContent>
        </Grid>
        <Grid>
          <Typography><a href="https://github.com/rick-mo/certification_question_app" target="_blank">github</a></Typography>
          <Typography><Link to="/issue">Issue List</Link></Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Top;
