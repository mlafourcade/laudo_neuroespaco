import React, { useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useData } from '../contexts/DataContext';

export const ModelsPage: React.FC = () => {
  const { topics } = useData();
  const textFieldRef = useRef<HTMLDivElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const topicId = event.dataTransfer.getData('text');
    const topic = topics.find(t => t.id === topicId);
    if (topic && textFieldRef.current) {
      const range = document.caretRangeFromPoint(event.clientX, event.clientY);
      const topicText = `<span style="color: blue;">{${topic.question}}</span>`;
      const span = document.createElement("span");
      span.innerHTML = topicText;
      if (range) {
        range.insertNode(span);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const range = document.caretRangeFromPoint(event.clientX, event.clientY);
    if (range && textFieldRef.current) {
      textFieldRef.current.focus();
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Lateral Esquerda: Lista de Tópicos */}
      <Box
        sx={{
          width: '50%',
          padding: '20px',
          borderRight: '1px solid #ddd',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Tópicos
        </Typography>
        {topics.map((topic) => (
          <Paper
            key={topic.id}
            sx={{
              padding: '16px',
              marginBottom: '10px',
              cursor: 'move',
              backgroundColor: '#fafafa',
            }}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text', topic.id)}
          >
            {topic.question}
          </Paper>
        ))}
      </Box>

      {/* Lateral Direita: Área de Texto */}
      <Box
        sx={{
          width: '50%',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Typography variant="h4" gutterBottom>
          Modelo de Texto
        </Typography>
        <Box
          contentEditable
          ref={textFieldRef}
          sx={{
            width: '100%',
            height: '100%',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '10px',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap',
            outline: 'none',
            cursor: 'text',
          }}
        />
      </Box>
    </Box>
  );
};
