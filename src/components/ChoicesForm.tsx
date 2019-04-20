import React, { useState } from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Toolbar, Fab, Tooltip, Typography, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { createStyles } from '@material-ui/styles';
import ChoiceBody from './ChoiceBody';
import ChoiceFormDialog, { ChoiceInfo } from './ChoiceFormDialog';

const initialRows = [
  { rowNum: 1, content: 'yeah', isAnswer: true },
  { rowNum: 2, content: 'aaaa', isAnswer: false },
  { rowNum: 3, content: 'tttt', isAnswer: false },
]

const useStyles = makeStyles(() => 
  createStyles({
    title: {
      flexGrow: 1
    },
  }),
);

const ChoicesForm = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(initialRows);

  const handleOpen = () => {
    setOpen(true);
  }

  //TODO: useCallback
  const handleClose = (choiceInfo: ChoiceInfo) => {
    const addRow = {
      rowNum: rows.length + 1,
      content: choiceInfo.content,
      isAnswer: choiceInfo.isAnswer
    }
    setRows((rows) => [...rows, addRow]);
    setOpen(false);
  }

  const removeRows = (targetNum: number) => {
    const newRows = rows.filter((v) => {
      return v.rowNum != targetNum;
    });
    setRows(newRows);
  }

  return (
    <Paper>
      <Toolbar>
        <Typography 
          className={classes.title}
          variant="h6"
        >
          Answer Choices
        </Typography>
        <Tooltip title="Add">
          <Fab 
            size="small"
            color="secondary"
            onClick={handleOpen}
          >
            <Add />
          </Fab>
        </Tooltip>
        <ChoiceFormDialog 
          open={open} 
          setOpen={setOpen}
          onClose={handleClose}
        />
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>action</TableCell>
            <TableCell>optionNumber</TableCell>
            <TableCell>content</TableCell>
            <TableCell>isAnswer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <ChoiceBody
              key={row.rowNum}
              rowNum={row.rowNum}
              content={row.content}
              isAnswer={row.isAnswer}
              removeRows={removeRows}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ChoicesForm;
