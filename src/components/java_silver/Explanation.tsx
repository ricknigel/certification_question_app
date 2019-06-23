import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions, Tooltip, IconButton, makeStyles } from '@material-ui/core';
import { ExpandMore, Report, Favorite, Edit, Delete } from '@material-ui/icons';
import Markdown from '../util/Markdown';
import { createStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => 
  createStyles({
    detail: {
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
    },
  }),
);

interface Props {
  expand: boolean,
  explanation: string,
  setExpand: (expand: boolean) => void,
  handleReport: () => void,
  fav: boolean,
  handleFavorite: () => void,
  editorQuestion: () => void,
  setOpenDelete: (open: boolean) => void,
}

const Explanation = (props: Props) => {
  const { expand, explanation, setExpand, handleReport, fav, handleFavorite, editorQuestion, setOpenDelete } = props;
  const classes = useStyles();
  return (
    <ExpansionPanel expanded={expand}>
      <ExpansionPanelSummary 
        expandIcon={<ExpandMore />}
        onClick={() => setExpand(!expand)}
      >
        Explanation
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.detail}>
        <Markdown input={explanation} />
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <Tooltip title="report">
          <IconButton onClick={handleReport}>
            <Report />
          </IconButton>
        </Tooltip>
        <Tooltip title="favorite">
          <IconButton onClick={handleFavorite}>
            {fav ? <Favorite color="error" />
              : <Favorite /> }
          </IconButton>
        </Tooltip>
        <Tooltip title="edit question">
          <IconButton onClick={editorQuestion}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="delete question">
          <IconButton onClick={() => setOpenDelete(true)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
};

export default Explanation;
