import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { Answer } from '../contexts/DataContext';

interface TextTopicContainerProps {
  topic: {
    id: string;
    question: string;
    answers: {
      id: string;
      text: string;
      responseText?: string;
    }[];
  };
  onAddText: (topicId: string, answerId: string) => void; // Função para adicionar texto
}

export const TextTopicContainer: React.FC<TextTopicContainerProps> = ({ topic, onAddText }) => {
  return (
    <Paper sx={{ padding: '16px', marginBottom: '16px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Typography variant="h6" gutterBottom>
        {topic.question}
      </Typography>
      {topic.answers.map((answer) => (
        <Box
          key={answer.id}
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '16px',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#fafafa'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Typography variant="body1" sx={{ overflowY: 'auto', maxHeight: '100px' }}>
              {answer.text}
            </Typography>
            {answer.responseText && (
              <Box
                sx={{
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  overflowY: 'auto',
                  maxHeight: '100px',
                  backgroundColor: '#fff'
                }}
              >
                <Typography variant="body2">{answer.responseText}</Typography>
              </Box>
            )}
          </Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onAddText(topic.id, answer.id)}
          >
            Criar Texto
          </Button>
        </Box>
      ))}
    </Paper>
  );
};
