import React, { useState } from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import { CreateTextForm } from '../pages/CreateTextForm';

interface AnswerContainerProps {
  answer: string;
  texts: string[];
  onAddText: (text: string) => void;
}

export const AnswerContainer: React.FC<AnswerContainerProps> = ({ answer, texts, onAddText }) => {
  const [open, setOpen] = useState(false);

  const handleCreateClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper sx={{ padding: '20px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <Typography variant="subtitle1" gutterBottom>
        {answer}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Criar
      </Button>
      <List sx={{ marginTop: '10px' }}>
        {texts.map((text, index) => (
          <ListItem key={index}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <CreateTextForm open={open} onClose={handleClose} onSave={onAddText} />
    </Paper>
  );
}
