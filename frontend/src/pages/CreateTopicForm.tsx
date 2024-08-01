import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface CreateTopicFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (topic: string) => void;
}

export const CreateTopicForm: React.FC<CreateTopicFormProps> = ({ open, onClose, onSave }) => {
  const [topic, setTopic] = useState('');

  const handleSave = () => {
    if (topic.trim()) {
      onSave(topic);
      setTopic('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Criar Novo Tópico</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '400px' }}>
          <Typography variant="body1" gutterBottom>
            Insira o novo tópico:
          </Typography>
          <TextField
            fullWidth
            label="Tópico"
            variant="outlined"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
