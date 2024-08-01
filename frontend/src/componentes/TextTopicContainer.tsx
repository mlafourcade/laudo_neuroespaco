import React from 'react';
import { Paper, Typography } from '@mui/material';
import { AnswerContainer } from './AnswerContainer';

interface TextTopicContainerProps {
  topic: string;
  answers: { answer: string; texts: string[] }[];
  onAddText: (answer: string, text: string) => void;
}

export const TextTopicContainer: React.FC<TextTopicContainerProps> = ({ topic, answers, onAddText }) => {
  return (
    <Paper sx={{ padding: '20px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <Typography variant="h6" gutterBottom>
        {topic}
      </Typography>
      {answers.map(({ answer, texts }) => (
        <AnswerContainer
          key={answer}
          answer={answer}
          texts={texts}
          onAddText={(text) => onAddText(answer, text)}
        />
      ))}
    </Paper>
  );
}
