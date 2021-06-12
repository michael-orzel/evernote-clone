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

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      loginError: ''
    }
  }

  userTyping = (type, e) => {
    switch (type) {
      case 'email':
        this.setState({ email: e.target.value });
        break;

      case 'password':
        this.setState({ password: e.target.value });
        break;
      
      default:
        break;
    }
  }

  submitLogin = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push('/');
      }, error => {
        this.setState({ loginError: 'Server error' });
      })
  }

  render() {
    const { classes } = this.props;

    return(
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography variant='h5' className={classes.paperHeader}>
            Log in
          </Typography>
          <form onSubmit={(e) => this.submitLogin(e)}
            className={classes.form}>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='login-email-input' className={classes.formInput}>
                Enter your email
              </InputLabel>
              <Input autoComplete='email' autoFocus 
                id='login-email-input'
                onChange={(e) => this.userTyping('email', e)} 
                className={classes.formInput}/>
            </FormControl>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='login-password-input' className={classes.formInput}>
                Enter your password
              </InputLabel>
              <Input type='password'
                id='login-password-input'
                onChange={(e) => this.userTyping('password', e)} 
                className={classes.formInput}/>
            </FormControl>
            <Button type='submit' fullWidth 
              variant='contained' color='primary'
              className={classes.submit}>
              Log in
            </Button>
          </form>

          {
            this.state.loginError ?
              <Typography component='h5' variant='h6'
                className={classes.errorText}>
                Incorrect login information
              </Typography>
              : null
          }
          <Typography component='h5' variant='h6'
            className={classes.noAccountHeader}>
            Don't have an account?
          </Typography>
          <Link to='/signup' className={classes.signUpLink}>
            Sign up
          </Link>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(LoginComponent);