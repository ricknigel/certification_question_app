import React from 'react';
import { Card, IconButton, Tooltip, makeStyles } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { createStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => 
  createStyles({
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

interface Props {
  count: number;
  page: number;
  setPage: (page :number) => void;
}

const Pagination = (props: Props) => {
  const { count, page, setPage } = props;
  const classes = useStyles();

  const handlePreviousPage = () => {
    // 最後のページなら最後のページの問題数をひき、違う場合は10を引く
    const newPage = page === count ? page - page % 10 : page - 10;
    setPage(newPage);
  };

  const handleNextPage = () => {
    const newPage = count - page > 10 ? page + 10 : count;
    setPage(newPage);
  };

  return (
    <Card className={classes.pagination}>
      {/* <Tooltip title="previous question"> */}
        <IconButton disabled={page <= 10} onClick={handlePreviousPage}>
            <KeyboardArrowLeft />
        </IconButton>
      {/* </Tooltip> */}
      <label>{page + " / " + count}</label>
      {/* <Tooltip title="next question"> */}
        <IconButton disabled={page === count} onClick={handleNextPage}>
            <KeyboardArrowRight />
        </IconButton>
      {/* </Tooltip> */}
    </Card>
  );
};

export default Pagination;
