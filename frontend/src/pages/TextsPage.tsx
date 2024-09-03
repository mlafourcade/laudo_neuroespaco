// src/pages/TextsPage.tsx

import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { TextTopicContainer } from '../componentes/TextTopicContainer';
import { useData } from '../contexts/DataContext';

export const TextsPage: React.FC = () => {
  const { topics, addTextToAnswer, updateTextToAnswer, deleteTextFromAnswer } = useData();
  const [open, setOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<{ topicId: string, answerId: string } | null>(null);
  const [newText, setNewText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleCreateClick = (topicId: string, answerId: string) => {
    setSelectedAnswer({ topicId, answerId });
    setIsEditing(false);
    setOpen(true);
  };

  const handleEditClick = (topicId: string, answerId: string, existingText: string) => {
    setSelectedAnswer({ topicId, answerId });
    setNewText(existingText);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDeleteText = (topicId: string, answerId: string) => {
    deleteTextFromAnswer(topicId, answerId);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAnswer(null);
    setNewText('');
    setIsEditing(false);
  };

  const handleSave = () => {
    if (selectedAnswer) {
      if (isEditing) {
        updateTextToAnswer(selectedAnswer.answerId, newText);
      } else {
        addTextToAnswer(selectedAnswer.answerId, newText);
      }
      handleClose();
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Textos
      </Typography>
      {topics.map((topic) => (
        <TextTopicContainer
          key={topic.id}
          topic={topic}
          onAddText={handleCreateClick}
          onEditText={handleEditClick} // Adiciona a função para edição
          onDeleteText={handleDeleteText}
        />
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Editar Texto' : 'Adicionar Texto'}</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={10}
            fullWidth
            variant="outlined"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            sx={{ overflowY: 'auto' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
