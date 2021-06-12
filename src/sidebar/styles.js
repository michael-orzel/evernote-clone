const styles = theme => ({
  root: {
    fontFamily: 'Poppins',
    backgroundColor: theme.palette.background.paper,
    height: 'calc(100% - 35px)',
    position: 'absolute',
    left: '0',
    width: '300px',
    boxShadow: '0px 0px 2px black'
  },
  newChatBtn: {
    borderRadius: '0px'
  },
  unreadMessage: {
    color: 'red',
    position: 'absolute',
    top: '0',
    right: '5px'
  },
  newNoteBtn: {
    fontFamily: 'Poppins',
    width: '100%',
    height: '35px',
    borderBottom: '1px solid black',
    borderRadius: '0px',
    backgroundColor: '#29487d',
    color: 'white',
    '&:hover': {
      backgroundColor: '#88a2ce'
    }
  },
  sidebarContainer: {
    fontFamily: 'Poppins',
    marginTop: '0px',
    width: '300px',
    height: '100vh',
    boxSizing: 'border-box',
    float: 'left',
    overflowY: 'scroll',
    overflowX: 'hidden'
  },
  newNoteInput: {
    fontFamily: 'Poppins',
    width: '100%',
    margin: '0px',
    height: '35px',
    outline: 'none',
    border: 'none',
    paddingLeft: '5px',
    '&:focus': {
      outline: '2px solid rgba(81, 203, 238, 1)'
    }
  },
  newNoteSubmitBtn: {
    fontFamily: 'Poppins',
    width: '100%',
    backgroundColor: '#28787c',
    borderRadius: '0px',
    color: 'white'
  },
  signOutBtn: {
    fontFamily: 'Poppins',
    position: 'absolute',
    bottom: '0px',
    left: '0px',
    width: '281px',
    height: '35px',
    borderBottom: '1px solid black',
    borderRadius: '0px',
    boxShadow: '0px 0px 2px black',
    backgroundColor: '#29487d',
    color: 'white',
    '&:hover': {
      backgroundColor: '#88a2ce'
    }
  },
});

export default styles;