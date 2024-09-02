// src/pages/TopicsPage.tsx
import React, { useState } from 'react';
import { Box, Button, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { CreateTopicForm } from './CreateTopicForm';
import { useData } from '../contexts/DataContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'; // Importar ícone de lixeira

export const TopicsPage: React.FC = () => {
  const { topics, addTopic, deleteTopic , updateTopic } = useData(); // Usando contexto para acessar tópicos globais e função de adicionar tópicos
  const [open, setOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<{ id: string; question: string } | null>(null);

  const handleCreateClick = () => {
    setOpen(true);
  };

  const handleEditClick = (topic: { id: string; question: string }) => {
    setCurrentTopic(topic);
    setOpen(true);
  };

  const handleDeleteClick = (topicId: string) => {
    deleteTopic(topicId); // Chama a função de deletar o tópico
  };
  
  const handleClose = () => {
    setOpen(false);
    setCurrentTopic(null);
  };

  const handleSave = (topicQuestion: string) => {
    if (currentTopic) {
      updateTopic(currentTopic.id, topicQuestion); // Atualiza o tópico existente
    } else {
      addTopic({ id: Date.now().toString(), question: topicQuestion, answers: [] }); // Cria um novo tópico
    }
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
      <List
        sx={{
          marginTop: '20px',
          backgroundColor: '#fff',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {topics.map((topic) => (
          <ListItem
            key={topic.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <ListItemText primary={topic.question} />
            <Box>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditClick(topic)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteClick(topic.id)} // Chama a função de deletar o tópico
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      <CreateTopicForm
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        initialText={currentTopic?.question || ''} // Define o texto inicial para o modal
      />
    </Box>
  );
};
