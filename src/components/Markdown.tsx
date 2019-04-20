import React from 'react';
import marked from 'marked';

interface Props {
  input: string
}

// TODO: syntax highlight
// TODO: not use dangerouslySetInnerHTML Markdown
const Markdown = (props: Props) => {
  const { input } = props;
  return (
    <div 
      dangerouslySetInnerHTML={{__html: marked(input)}}
    ></div>
  );
};

export default Markdown;
