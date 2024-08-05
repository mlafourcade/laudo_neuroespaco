// src/pages/TextsPage.tsx
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useData } from '../contexts/DataContext';
import { TextTopicContainer } from '../componentes/TextTopicContainer';
import { CreateTextForm } from './CreateTextForm';

export const TextsPage: React.FC = () => {
  const { topics, addTextToAnswer } = useData();
  const [open, setOpen] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const handleAddTextClick = (topicId: string, answerId: string) => {
    setSelectedTopicId(topicId);
    setSelectedAnswerId(answerId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTopicId(null);
    setSelectedAnswerId(null);
  };

  const handleSave = (text: string) => {
    if (selectedTopicId && selectedAnswerId) {
      addTextToAnswer(selectedTopicId, selectedAnswerId, text);
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
          answers={topic.answers}
          onAddText={handleAddTextClick}
        />
      ))}
      <CreateTextForm open={open} onClose={handleClose} onSave={handleSave} />
    </Box>
  );
};
