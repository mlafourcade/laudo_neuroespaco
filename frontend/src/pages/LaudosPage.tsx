import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useData } from '../contexts/DataContext';

export const LaudosPage: React.FC = () => {
  const { models } = useData();

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Modelos Criados
      </Typography>
      <List>
        {models.length > 0 ? (
          models.map((model) => (
            <ListItem key={model.id}>
              <ListItemText primary={model.name} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">Nenhum modelo criado ainda.</Typography>
        )}
      </List>
    </Box>
  );
};
