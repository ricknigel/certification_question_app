import React, { useState, useCallback } from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Toolbar, Tooltip, Typography, makeStyles, Theme, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { createStyles } from '@material-ui/styles';
import OptionBody from './OptionBody';
import OptionFormDialog from './OptionFormDialog';
import { OptionInfo } from '../util/types';

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
  const [optionIndex, setOptionIndex] = useState(0);
  const [openRegister, setOpenRegister] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);

  const handleRegisterClose = useCallback((add: OptionInfo) => {
    addOptions([...options, add]);
    setOpenRegister(() => false);
  }, [options, setOpenRegister]);

  const handleEditorClose = useCallback((editOpt: OptionInfo) => {
    const editOptions = [...options];
    editOptions[optionIndex] = {
      optionName: editOpt.optionName,
      isAnswer: editOpt.isAnswer
    }
    addOptions(editOptions);
    setOpenEditor(() => false);
  }, [options, setOpenEditor, optionIndex]);

  const editorOption = useCallback((index: number) => {
    setOpenEditor(() => true);
    setOptionIndex(() => index);
  }, [setOpenEditor, setOptionIndex]);

  const removeOption = useCallback((targetIndex: number) => {
    const newOptions = options.filter((value, index) => {
      return index != targetIndex;
    });
    addOptions(newOptions);
  }, [options]);

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
            onClick={() => setOpenRegister(true)}
          >
            <Add />
          </IconButton>
        </Tooltip>
        <OptionFormDialog 
          open={openRegister} 
          setOpen={setOpenRegister}
          onClose={handleRegisterClose}
        />
        { openEditor &&
          <OptionFormDialog
            open={openEditor}
            option={options[optionIndex]}
            setOpen={setOpenEditor}
            onClose={handleEditorClose}
          /> }
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Action</Typography>
            </TableCell>
            <TableCell>
              <Typography>OptionName</Typography>
            </TableCell>
            <TableCell>
              <Typography>Answer</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {options.map((value, index) => (
            <OptionBody
              key={index}
              index={index}
              option={value}
              editOption={editorOption}
              removeOption={removeOption}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default OptionList;
