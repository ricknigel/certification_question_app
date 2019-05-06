import React, { memo } from 'react';
import { TableRow, TableCell, IconButton, Tooltip } from '@material-ui/core';
import { Edit, Delete, Check, Close } from '@material-ui/icons';
import { OptionInfo } from '../../util/types';

interface Props {
  index: number,
  option: OptionInfo,
  editOption: (index: number) => void,
  removeOption: (index: number) => void
}

const OptionBody = memo((props: Props) => {
  const { index, option, editOption, removeOption } = props;
  return (
    <TableRow>
      <TableCell>
        <Tooltip title="Edit Option">
          <IconButton 
            size="small"
            onClick={() => editOption(index)}
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Option">
          <IconButton 
            size="small" 
            onClick={() => removeOption(index)}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell>{option.optionName}</TableCell>
      <TableCell>
        { option.isAnswer ? <Check color="secondary" /> : <Close color="error" /> }
      </TableCell>
    </TableRow>
  );
}, (prev, next) => prev.option === next.option);

export default OptionBody;
