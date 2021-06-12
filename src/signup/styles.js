const styles = theme => ({
  main: {
    fontFamily: 'Poppins',
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    fontFamily: 'Poppins',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,

    '@media (min-width: 1200px)': {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(2.5),
    }
  },
  paperHeader: {
    fontFamily: 'Poppins',
    fontSize: '1.5rem',

    '@media (min-width: 1200px)': {
      fontSize: '1.625rem',
    }
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(0),

    '@media (min-width: 1200px)': {
      marginTop: theme.spacing(0),
    }
  },
  formInput: {
    fontFamily: 'Poppins',
    fontSize: '1rem',

    '@media (min-width: 1200px)': {
      fontSize: '1.0625rem',
    }
  },
  submit: {
    fontFamily: 'Poppins',
    fontSize: '0.875rem',
    marginTop: theme.spacing(2.5),

    '@media (min-width: 1200px)': {
      fontSize: '0.9375rem',
      marginTop: theme.spacing(3.5),
    }
  },
  hasAccountHeader: {
    fontFamily: 'Poppins',
    fontSize: '18px',
    width: '100%',
    paddingTop: '10px',
  },
  logInLink: {
    width: '100%',
    textDecoration: 'none',
    color: '#303f9f',
    fontWeight: 'bolder'
  },
  errorText: {
    fontFamily: 'Poppins',
    fontSize: '18px',
    paddingTop: '15px',
    color: 'red',
    textAlign: 'center'
  }
});

export default styles;