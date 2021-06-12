  
const styles = theme => ({
  listItem: {
    fontFamily: 'Poppins',
    cursor: 'pointer'
  },
  textSection: {
    fontFamily: 'Poppins',
    maxWidth: '85%'
  },
  liText: {
    fontFamily: 'Poppins',
  },
  deleteIcon: {
    position: 'absolute',
    right: '5px',
    top: 'calc(50% - 15px)',
    '&:hover': {
      color: 'red'
    }
  }
});

export default styles;