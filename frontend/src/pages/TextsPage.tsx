import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { TextTopicContainer } from '../componentes/TextTopicContainer';

export const TextsPage: React.FC = () => {
  const [topics, setTopics] = useState<{ [key: string]: { answer: string; texts: string[] }[] }>({
    'Tópico 1': [
      { answer: 'Resposta A', texts: ['Texto 1A', 'Texto 2A'] },
      { answer: 'Resposta B', texts: [] },
    ],
    'Tópico 2': [
      { answer: 'Resposta C', texts: ['Texto 1C'] },
    ],
    // Dados de exemplo
  });

  const handleAddText = (answer: string, text: string) => {
    setTopics((prevTopics) => {
      const updatedTopics = { ...prevTopics };
      for (const topic in updatedTopics) {
        const answerIndex = updatedTopics[topic].findIndex(a => a.answer === answer);
        if (answerIndex !== -1) {
          updatedTopics[topic][answerIndex].texts.push(text);
          break;
        }
      }
      return updatedTopics;
    });
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Textos
      </Typography>
      {Object.entries(topics).map(([topic, answers]) => (
        <TextTopicContainer
          key={topic}
          topic={topic}
          answers={answers}
          onAddText={handleAddText}
        />
      ))}
    </Box>
  );
}
