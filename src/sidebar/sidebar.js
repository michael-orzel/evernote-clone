import React from 'react';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import SidebarItemComponent from '../sidebaritem/sidebaritem';

class SidebarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingNote: false,
      title: ''
    };
  }

  selectNote = (n, i) => this.props.selectNote(n, i);

  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({
      addingNote: false,
      title: ''
    });
  }
  
  deleteNote = (note) => this.props.deleteNote(note);

  signOut = () => this.props.signOut();

  newNoteBtnClick = () => {
    this.setState(prevState => ({ 
      addingNote: !prevState.addingNote,
      title: null 
    }));
  }

  updateTitle = (txt) => {
    this.setState({ title: txt });
  }

  render() {
    const { notes, selectedNoteIndex, classes } = this.props;

    return (
      <div className={classes.sidebarContainer}>
        <Button
          onClick={this.newNoteBtnClick}
          className={classes.newNoteBtn}>
          {
            this.state.addingNote ? 'Cancel'
              : 'New Note'
          }
        </Button>
        {
          this.state.addingNote ?
            <div>
              <input
                type='text'
                placeholder='Enter note title'
                className={classes.newNoteInput}
                onKeyUp={(e) => this.updateTitle(e.target.value)}>
              </input>
              <Button
                className={classes.newNoteSubmitBtn}
                onClick={this.newNote}>
                Submit Note
              </Button>
            </div>
            : null
        }

        <List>
          {
            notes.map((note, index) => {
              return(
                <div key={index}>
                  <SidebarItemComponent 
                    note={note}
                    index={index}
                    selectedNoteIndex={selectedNoteIndex}
                    selectNote={this.selectNote}
                    deleteNote={this.deleteNote} />
                  <Divider />
                </div>
              )
            })
          }
        </List>

        <Button
          className={classes.signOutBtn}
          onClick={this.signOut}>
          Sign out
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(SidebarComponent);