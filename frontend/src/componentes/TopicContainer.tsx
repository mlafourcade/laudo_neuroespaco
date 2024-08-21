import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useData } from '../contexts/DataContext';
import { CreateAnswerForm } from '../pages/CreateAnswerForm';

export const AnswersPage: React.FC = () => {
  const { topics, addAnswerToTopic } = useData(); // Acessando tópicos globais e função de adicionar respostas
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleCreateClick = (topicId: string) => {
    setSelectedTopicId(topicId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (answer: string) => {
    if (selectedTopicId) {
      addAnswerToTopic(selectedTopicId, answer);
      setOpen(false);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Respostas
      </Typography>
      {topics.map((topic) => (
        <Box key={topic.id} sx={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <Typography variant="h6">{topic.question}</Typography>
          <List>
            {topic.answers.map((answer) => (
              <ListItem key={answer.id}>
                <ListItemText primary={answer.text} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary" onClick={() => handleCreateClick(topic.id)}>
            Criar Resposta
          </Button>
        </Box>
      ))}
      <CreateAnswerForm open={open} onClose={handleClose} onSave={handleSave} />
    </Box>
  );
};