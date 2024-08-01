import React from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#1976d2',
});

const StyledTab = styled(Tab)({
  minWidth: 100,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export const MainMenu: React.FC = () => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Ferramenta de Modelos de Textos
        </Typography>
        <Tabs value={value} onChange={handleChange} textColor="inherit" indicatorColor="secondary">
          <Tab label="Laudos" component={Link} to="/" />
          <Tab label="Tópicos" component={Link} to="/topicos" />
          <Tab label="Respostas" component={Link} to="/respostas" />
          <Tab label="Textos" component={Link} to="/texts" />
          <Tab label="Modelos" component={Link} to="/modelos" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}
