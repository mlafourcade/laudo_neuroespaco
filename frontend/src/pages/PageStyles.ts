import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100vh',
  },
  leftSide: {
    width: '50%',
    padding: '20px',
    borderRight: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
  },
  rightSide: {
    width: '50%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
  },
});

export default useStyles;
