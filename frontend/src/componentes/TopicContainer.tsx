// src/components/TopicContainer.tsx
import React, { useState } from 'react';
import { Box, Typography, List, ListItem, Button } from '@mui/material';
import { Answer, Topic } from '../contexts/DataContext.tsx';

interface TopicContainerProps {
  topic: Topic;
  onAddAnswer: (answerText: string) => void;
}

export const TopicContainer: React.FC<TopicContainerProps> = ({ topic, onAddAnswer }) => {
  const [newAnswerText, setNewAnswerText] = useState('');

  const handleAddAnswer = () => {
    if (newAnswerText.trim()) {
      onAddAnswer(newAnswerText);
      setNewAnswerText('');
    }
  };

  return (
    <Box sx={{ padding: '16px', marginBottom: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <Typography variant="h6">{topic.question}</Typography>
      <List>
        {topic.answers.map((answer: Answer) => (
          <ListItem key={answer.id}>
            <Typography>{answer.text}</Typography>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
        <input
          type="text"
          value={newAnswerText}
          onChange={(e) => setNewAnswerText(e.target.value)}
          placeholder="Adicionar resposta"
          style={{ flexGrow: 1, marginRight: '8px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddAnswer}>
          Criar
        </Button>
      </Box>
    </Box>
  );
};