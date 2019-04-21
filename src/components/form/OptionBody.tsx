import React from 'react';
import { TableRow, TableCell, IconButton, Tooltip } from '@material-ui/core';
import { Edit, Delete, Check, Close } from '@material-ui/icons';

interface Props {
  option: string,
  isAnswer: boolean,
  editOption: (target: string) => void,
  removeOption: (target: string) => void
}

const OptionBody = (props: Props) => {
  const { option, isAnswer, editOption, removeOption } = props;
  return (
    <TableRow>
      <TableCell>
        {/* <Tooltip title="Edit">
          <IconButton 
            size="small"
            onClick={() => editRow(content)}
          >
            <Edit />
          </IconButton>
        </Tooltip> */}
        <Tooltip title="Delete Option">
          <IconButton 
            size="small" 
            onClick={() => removeOption(option)}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell>{option}</TableCell>
      <TableCell>
        { isAnswer ? <Check color="secondary" /> : <Close color="error" /> }
      </TableCell>
    </TableRow>
  );
};

export default OptionBody;
