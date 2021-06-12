import React from 'react';
import ReactQuill from 'react-quill';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import debounce from '../helpers';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      id: ''
    };
  }

  componentDidMount = () => {
    this.setState ({
      title: this.props.selectedNote.title,
      text: this.props.selectedNote.body,
      id: this.props.selectedNote.id
    });
  }

  componentDidUpdate = () => {
    if(this.props.selectedNote.id !== this.state.id) {
      this.setState ({
        title: this.props.selectedNote.title,
        text: this.props.selectedNote.body,
        id: this.props.selectedNote.id
      });
    }
  }

  updateTitle = async (txt) => {
    await this.setState({ title: txt});
    this.update();
  }

  updateBody = async (txt) => {
    this.setState({ text: txt });
    this.update();
  }

  update = debounce(() => {
    this.props.updateNote(this.state.id, {
      title: this.state.title,
      body: this.state.text
    });
  }, 2000)

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon} />
        <input
          value={this.state.title ? this.state.title: ''}
          placeholder='Note title...'
          className={classes.titleInput}
          onChange={(e) => this.updateTitle(e.target.value)}>
        </input>
        <ReactQuill 
          value={this.state.text}
          onChange={this.updateBody} />
      </div>
    )
  }
}

export default withStyles(styles)(EditorComponent);