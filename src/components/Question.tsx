import React, { useState } from 'react';
import { Paper, Typography, ListItem, ListItemIcon, ListItemText, Checkbox } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Markdown from './util/Markdown';
import QuestionInfo from './util/types';

interface Props {
  item: QuestionInfo
}

const Question = (props: Props) => {
  const { item } = props;
  const [checked, setChecked] = useState<number[]>([]);

  const handleSelect = (index: number) => () => {
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];

    currentIndex === -1 ? newChecked.push(index) : newChecked.splice(currentIndex, 1);

    setChecked(newChecked);
  }

  return (
    <Paper>
      <Typography>
        <Link to={'/question/' + item.id}>{item.title}</Link>
      </Typography>
      <Markdown title="Question" input={item.question} />
      {item.options.map((v, i) => (
        <ListItem key={i} dense button onClick={handleSelect(i)}>
          <ListItemIcon>
            <Checkbox checked={checked.indexOf(i) !== -1} />
          </ListItemIcon>
          <ListItemText primary={(i + 1) + '.  ' + v.optionName} />
        </ListItem>
      ))}
      <Markdown title="Explanation" input={item.explanation} />
    </Paper>
  );
};

export default Question;
