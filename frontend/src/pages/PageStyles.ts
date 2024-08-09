import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },
  leftSide: {
    width: '50%',
    padding: '20px',
    borderRight: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  rightSide: {
    width: '50%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  paper: {
    border: '1px solid #ddd',
    padding: '16px',
    marginBottom: '10px',
    cursor: 'move',
    backgroundColor: '#fafafa',
  },
  selectContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  select: {
    flexGrow: 1,
  },
  addButton: {
    marginLeft: '10px',
    minWidth: '40px',
    height: '50px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textField: {
    outline: 'none',
    cursor: 'text',
    flexGrow: 1,
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '10px',
    overflowY: 'auto',
    marginBottom: '10px',
  },
  save: {
    marginTop: '10px',
  },
  topic: {
    color: 'blue', /* Define a cor azul */
    fontWeight: 'bold',
  },
});

export default useStyles;
