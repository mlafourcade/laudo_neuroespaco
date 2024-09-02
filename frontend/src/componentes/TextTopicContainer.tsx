import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // Adicione esta linha

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
  onEditText?: (topicId: string, answerId: string, existingText: string) => void; // Função opcional para editar texto
}

export const TextTopicContainer: React.FC<TextTopicContainerProps> = ({ topic, onAddText, onEditText }) => {
  return (
    <Paper sx={{ padding: '16px', marginBottom: '16px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Typography variant="h6" gutterBottom>
        {topic.question}
      </Typography>
      {topic.answers.map((answer) => (
        <Box
          key={answer.id}
          sx={{
            display: 'flex',
            flexDirection: 'column', // Mantém a estrutura vertical
            gap: '16px',
            marginBottom: '16px',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#fafafa'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body1" sx={{ overflowY: 'auto', maxHeight: '100px' }}>
              {answer.text}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onAddText(topic.id, answer.id)}
              sx={{
                opacity: answer.responseText ? 0.5 : 1,
                cursor: answer.responseText ? 'not-allowed' : 'pointer'
              }}
              disabled={!!answer.responseText} // Desabilita o botão se já houver um texto
            >
              Criar Texto
            </Button>
          </Box>
          {answer.responseText && (
            <Box
              sx={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                overflowY: 'auto',
                maxHeight: '100px',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" sx={{ flex: 1 }}>
                {answer.responseText}
              </Typography>
              {onEditText && (
                <EditIcon
                  sx={{ cursor: 'pointer', marginLeft: '8px' }}
                  onClick={() => onEditText(topic.id, answer.id, answer.responseText || '')}
                />
              )}
            </Box>
          )}
        </Box>
      ))}
    </Paper>
  );
};
