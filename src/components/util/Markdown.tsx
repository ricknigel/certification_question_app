import React, { Fragment, useEffect } from 'react';
import marked from 'marked';
import { Typography, Divider } from '@material-ui/core';
const hljs = require('highlight.js');

interface Props {
  input: string
  title?: string
}

// TODO: cant add syntax highlight
// TODO: want not to use dangerouslySetInnerHTML Markdown
const Markdown = (props: Props) => {
  const { input, title } = props;
  useEffect(() => {
    marked.setOptions({
      highlight: function(code, lang) {
        return hljs.highlightAuto(code, [lang]).value;
      }
    });
  }, []);

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
