import React from 'react';
import { TableRow, TableCell, Checkbox, IconButton, Tooltip } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

interface Props {
  rowNum: number,
  content: string,
  isAnswer: boolean,
  removeRows: (num: number) => void
}

const ChoiceBody = (props: Props) => {
  const { rowNum, content, isAnswer, removeRows } = props;
  return (
    <TableRow>
      <TableCell>
        <Tooltip title="Edit">
          <IconButton size="small">
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton 
            size="small" 
            onClick={() => removeRows(rowNum)}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell>{rowNum}</TableCell>
      <TableCell>{content}</TableCell>
      <TableCell>
        <Checkbox checked={isAnswer} />
      </TableCell>
    </TableRow>
  );
};

export default ChoiceBody;
