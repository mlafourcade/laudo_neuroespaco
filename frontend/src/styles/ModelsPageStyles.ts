import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },
  leftSide: {
    width: '30%',
    padding: '20px',
    borderRight: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  rightSide: {
    width: '70%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  paper: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
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
    flexGrow: 1,
    minHeight: '200px',
    border: '1px solid #ddd',
    padding: '10px',
    overflowY: 'auto',
    marginBottom: '10px',
  },
  button: {
    marginTop: '10px',
  },
  dialog: {
    // Adicione estilos para o diálogo aqui, se necessário
  },
});

export default useStyles;
