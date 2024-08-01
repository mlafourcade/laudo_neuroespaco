import React, { useState } from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { CreateAnswerForm } from './CreateAnswerForm';
import { useData } from '../contexts/DataContext.tsx';

export const AnswersPage: React.FC = () => {
  const [answers, setAnswers] = useState<string[]>(['Resposta A', 'Resposta B', 'Resposta C']); // Dados de exemplo
  const { addAnswerToTopic } = useData(); // Usando contexto para acessar tópicos globais e função de adicionar tópicos
  const [open, setOpen] = useState(false);

  const handleCreateClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (answer: string) => {
    setAnswers([...answers, answer]);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Respostas
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Criar
      </Button>
      <List sx={{ marginTop: '20px', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        {answers.map((answer, index) => (
          <ListItem key={index}>
            <ListItemText primary={answer} />
          </ListItem>
        ))}
      </List>
      <CreateAnswerForm open={open} onClose={handleClose} onSave={handleSave} />
    </Box>
  )
}
