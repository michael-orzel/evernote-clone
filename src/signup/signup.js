import React from 'react';
import firebase from 'firebase/app'
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

require('firebase');
require('firebase/firestore');

class SignupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null,
      signupError: ''
    }
  }

  formIsValid = () => this.state.password === this.state.passwordConfirmation;

  userTyping = (type, e) => {
    switch (type) {
      case 'email':
        this.setState({ email: e.target.value });
        break;
      
      case 'password':
        this.setState({ password: e.target.value });
        break;

      case 'passwordConfirmation':
        this.setState({ passwordConfirmation: e.target.value });
        break;

        default:
          break;
    }
  }

  submitSignup = (e) => {
    e.preventDefault();

    if(!this.formIsValid()) {
      this.setState({ signupError: 'Passwords do not match' });
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(authRes => {
        const userObj = {
          uid: authRes.user.uid,
          email: authRes.user.email
        };
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set(userObj)
          .then(() => {
            this.props.history.push('/')
          }, dbError => {
            this.setState({ signupError: 'Failed to add user' });
          })
      },  authError => {
            this.setState({ signupError: 'Failed to add user' });
          })
  }

  render() {
    const { classes } = this.props;

    return(
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography variant='h5' className={classes.paperHeader}>
            Sign up
          </Typography>
          <form onSubmit={(e) => this.submitSignup(e)} className={classes.form}>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='signup-email-input' className={classes.formInput}>
                Enter your email
              </InputLabel>
              <Input autoComplete='email' autoFocus 
                id='signup-email-input'
                onChange={(e) => this.userTyping('email', e)} 
                className={classes.formInput}/>
            </FormControl>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='signup-password-input' className={classes.formInput}>
                Create a password
              </InputLabel>
              <Input type='password'
                id='signup-password-input'
                onChange={(e) => this.userTyping('password', e)} 
                className={classes.formInput}/>
            </FormControl>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='signup-password-confirmation-input' className={classes.formInput}>
                Confirm your password
              </InputLabel>
              <Input type='password'
                id='signup-password-confirmation-input'
                onChange={(e) => this.userTyping('passwordConfirmation', e)} 
                className={classes.formInput}/>
            </FormControl>
            <Button type='submit' fullWidth
              variant='contained' color='primary'
              className={classes.submit}>
              Submit
            </Button>
          </form>

          {
            this.state.signupError ?
              <Typography variant='h6'
                className={classes.errorText}>
                  {this.state.signupError}
              </Typography>
              : null
          }
          <Typography variant='h6'
            className={classes.hasAccountHeader}>
            Already have an account?
          </Typography>
          <Link to='/login' className={classes.logInLink}>Log in</Link>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(SignupComponent);