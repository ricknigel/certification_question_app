import React, { Fragment, useEffect } from 'react';
import marked from 'marked';
// import hljs from 'highlight.js';
import { Typography, Divider, makeStyles, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
// import '../../css/Markdown.css';

const useStyles = makeStyles((theme: Theme) => createStyles({
    mark: {
      '& pre': {
        position: 'relative',
        padding: '12px 18px',
        backgroundColor: theme.palette.grey[100],
        overflow: 'auto',
        borderRadius: theme.shape.borderRadius,
        WebkitOverflowScrolling: 'touch',
      },
      '& code': {
        fontSize: 12,
        fontFamily: 'Menlo, Consolas, "DejaVu Sans Mono"',
      },
    },
  }),
);

interface Props {
  input: string
  title?: string
}

// TODO: cant add syntax highlight
// TODO: want not to use dangerouslySetInnerHTML Markdown
const Markdown = (props: Props) => {
  const { input, title } = props;
  const classes = useStyles();
  useEffect(() => {
    const renderer = new marked.Renderer();
    renderer.code = function(code, language) {
      // const a = code.split(/[{};]/);
      // console.log(a);
      return '<pre><code class="line-numbers">' + code + '</code></pre>';
    };
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      renderer: renderer,
    });
  }, []);

  return (
    <Fragment>
      <Typography variant="h6">{title}</Typography>
      <Divider />
      <div 
        className={classes.mark}
        dangerouslySetInnerHTML={{__html: marked(input)}}
      ></div>
    </Fragment>
  );
};

export default Markdown;
