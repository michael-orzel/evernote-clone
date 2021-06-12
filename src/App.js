import React from 'react';
import firebase from 'firebase/app';
import './App.css';
import SidebarComponent from './sidebar/sidebar'
import EditorComponent from './editor/editor'

require('firebase');
require('firebase/firestore');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      selectedNote: null,
      selectedNoteIndex: null
    };
  }

  componentDidMount = () => {
    this.authListener();
  }

  componentWillUnmount = () => {
    this.fireBaseListener && this.fireBaseListener();
    this.authListener = undefined;
  }

  authListener = () => {
    this.fireBaseListener = firebase
      .auth()
      .onAuthStateChanged(async user => {
        if(!user) this.props.history.push('/login');
        else {
          const currUser = firebase.auth().currentUser;

          await firebase
            .firestore()
            .collection('users')
            .doc(currUser.uid)
            .collection('notes')
            .orderBy('updatedAt', 'desc')
            .onSnapshot(serverUpdate => {
              const notes = serverUpdate.docs.map(doc => {
                const data = doc.data();
                data['id'] = doc.id;
                return data;
              });
    
              this.setState({ notes: notes });
          });
        }
      })
  }
  
  signOut = () => firebase.auth().signOut();

  findNote = async (noteIndex) => {
    return this.state.notes[noteIndex];
  }

  selectNote = (note, index) => this.setState({ 
    selectedNote: note,
    selectedNoteIndex: index 
  })

  newNote = async (title) => {
    const note = {
      title: title,
      body: ''
    };
    const currUser = firebase.auth().currentUser;

    const newDBEntry = await firebase
      .firestore()
      .collection('users')
      .doc(currUser.uid)
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      const newEntryID = newDBEntry.id;

      await this.setState({ notes: [...this.state.notes] });
      const newNoteIndex = 
        this.state.notes
          .indexOf(this.state.notes
            .filter(note => note.id === newEntryID)[0]);

      this.selectNote(this.state.notes[newNoteIndex], newNoteIndex);
  }

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState(state => ({
      notes: state.notes.filter(n => n !== note)
    }))

    if(this.state.selectedNoteIndex === noteIndex) {
      this.setState({
        selectedNote: null,
        selectedNoteIndex: null
      });
    } else {
      this.state.selectedNoteIndex > noteIndex && this.state.notes.length > 1 ?
        this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1)
        : this.state.selectedNoteIndex < noteIndex && this.state.notes.length > 1 ?
          this.selectNote(this.state.notes[this.state.selectedNoteIndex], this.state.selectedNoteIndex)
        : this.setState({
          selectedNote: null,
          selectedNoteIndex: null
        });
    }

    const currUser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('users')
      .doc(currUser.uid)
      .collection('notes')
      .doc(note.id)
      .delete();
  }

  updateNote = async (id, newValues) => {
    const noteIndex = 
    this.state.notes.indexOf(this.state.notes
      .filter(note => note.id === id)[0]);
    
    if(this.findNote(noteIndex) === null) return;

    const note = await this.findNote(noteIndex);

    if(note.body === '') note.body = '<p><br></p>';
    if(newValues.body === '') newValues.body = '<p><br></p>';

    if(note.title !== newValues.title 
      || note.body !== newValues.body) {
      const currUser = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection('users')
        .doc(currUser.uid)
        .collection('notes')
        .doc(id)
        .update({
          title: newValues.title,
          body: newValues.body,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

      note.title = newValues.title;
      note.body = newValues.body;
      const otherNotes = this.state.notes.filter(note => note.id !== id);

      await this.setState({ notes: [note, ...otherNotes] });

      this.selectNote(this.state.selectedNote, 0);
    }
  }

  render() {
    return(
      <div className="app-container">
        <SidebarComponent
          notes={this.state.notes}
          selectedNoteIndex={this.state.selectedNoteIndex}
          newNote={this.newNote}
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
          signOut={this.signOut} />
        {
          this.state.selectedNote ?
            <EditorComponent 
              notes={this.state.notes}
              selectedNote={this.state.selectedNote}
              selectedNoteIndex={this.state.selectedNoteIndex}
              updateNote={this.updateNote} />
            : null
        }
      </div>
    )
  }
}

export default App;
