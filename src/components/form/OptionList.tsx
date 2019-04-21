import React, { useState, useCallback } from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Toolbar, Tooltip, Typography, makeStyles, Theme, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { createStyles } from '@material-ui/styles';
import OptionBody from './OptionBody';
import OptionFormDialog from './OptionFormDialog';
import { OptionInfo } from './QuestionCreatorForm';

interface Props {
  options: OptionInfo[],
  addOptions: (optionInfo: OptionInfo[]) => void
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    paper: {
      marginTop: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const OptionList = (props: Props) => {
  const { options, addOptions } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = useCallback((add: OptionInfo) => {
    console.log([...options, add]);
    addOptions([...options, add]);
    setOpen(false);
  }, [options]);

  const editOption = (targetRow: string) => {

  };

  const removeOption = (targetRow: string) => {
    const newRows = options.filter((v) => {
      return v.option != targetRow;
    });
    addOptions(newRows);
  };

  return (
    <Paper className={classes.paper}>
      <Toolbar>
        <Typography 
          className={classes.title}
          variant="h6"
        >
          Options List
        </Typography>
        <Tooltip title="Add Options">
          <IconButton 
            size="small"
            onClick={() => setOpen(true)}
          >
            <Add />
          </IconButton>
        </Tooltip>
        <OptionFormDialog 
          open={open} 
          setOpen={setOpen}
          onClose={handleClose}
        />
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Action</Typography>
            </TableCell>
            <TableCell>
              <Typography>Option</Typography>
            </TableCell>
            <TableCell>
              <Typography>Answer</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {options.map(row => (
            <OptionBody
              key={row.option}
              option={row.option}
              isAnswer={row.isAnswer}
              editOption={editOption}
              removeOption={removeOption}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default OptionList;
