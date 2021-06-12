import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class SidebarItemComponent extends React.Component {
  selectNote = (n, i) => this.props.selectNote(n, i);
  
  deleteNote = (note) => {
    if(window.confirm(`Are you sure you want to delete: "${note.title}"?`)) {
      this.props.deleteNote(note);
    }
  }

  render() {
    const { note, index, selectedNoteIndex, classes } = this.props;

    return(
      <div key={index}>
        <ListItem
          selected={selectedNoteIndex === index}
          alignItems='flex-start'
          className={classes.listItem}>
          <div
            onClick={() => this.selectNote(note, index)}
            className={classes.textSection}>
            <ListItemText
              primary={note.title}
              secondary={removeHTMLTags(note.body.substring(0, 30)) + '...'}/>
          </div>
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={() => this.deleteNote(note)}>
          </DeleteIcon>
        </ListItem>
      </div>
    )
  }
}

export default withStyles(styles)(SidebarItemComponent)