import React, { Fragment } from 'react';
import marked from 'marked';
import { Typography, Divider } from '@material-ui/core';

interface Props {
  input: string
  title?: string
}

// TODO: syntax highlight
// TODO: not use dangerouslySetInnerHTML Markdown
const Markdown = (props: Props) => {
  const { input, title } = props;
  return (
    <Fragment>
      <Typography variant="h6">{title}</Typography>
      <Divider />
      <div 
        dangerouslySetInnerHTML={{__html: marked(input)}}
      ></div>
    </Fragment>
  );
};

export default Markdown;
