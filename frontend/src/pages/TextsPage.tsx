import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { TextTopicContainer } from '../componentes/TextTopicContainer';
import { useData } from '../contexts/DataContext';

export const TextsPage: React.FC = () => {
  const { topics, addTextToAnswer } = useData(); // Usando contexto para acessar tópicos e adicionar textos
  const [open, setOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<{ topicId: string, answerId: string } | null>(null);
  const [newText, setNewText] = useState('');

  const handleCreateClick = (topicId: string, answerId: string) => {
    setSelectedAnswer({ topicId, answerId });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAnswer(null);
    setNewText('');
  };

  const handleSave = () => {
    if (selectedAnswer) {
      addTextToAnswer(selectedAnswer.topicId, selectedAnswer.answerId, newText);
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
          onAddText={handleCreateClick} // Passa a função que abre o modal para adicionar texto
        />
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar Texto</DialogTitle>
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
