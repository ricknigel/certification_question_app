import React from 'react';
import marked from 'marked';
import { Paper, Typography, Divider } from '@material-ui/core';

interface Props {
  input: string
}

// TODO: syntax highlight
// TODO: not use dangerouslySetInnerHTML Markdown
const Markdown = (props: Props) => {
  const { input } = props;
  return (
    <Paper>
      <Typography>Markdown Preview</Typography>
      <Divider />
      <div 
        dangerouslySetInnerHTML={{__html: marked(input)}}
      ></div>
    </Paper>
  );
};

export default Markdown;
