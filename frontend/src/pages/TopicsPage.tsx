// src/pages/TopicsPage.tsx
import React, { useState } from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { CreateTopicForm } from './CreateTopicForm';
import { useData } from '../contexts/DataContext';

export const TopicsPage: React.FC = () => {
  const { topics, addTopic } = useData(); // Usando contexto para acessar tópicos globais e função de adicionar tópicos
  const [open, setOpen] = useState(false);

  const handleCreateClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (topic: string) => {
    addTopic({ id: Date.now().toString(), question: topic, answers: [] });
    setOpen(false);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Tópicos
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Criar
      </Button>
      <List sx={{ marginTop: '20px', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        {topics.map((topic) => (
          <ListItem key={topic.id}>
            <ListItemText primary={topic.question} />
          </ListItem>
        ))}
      </List>
      <CreateTopicForm open={open} onClose={handleClose} onSave={handleSave} />
    </Box>
  );
}
