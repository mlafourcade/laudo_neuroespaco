import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface CreateTopicFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (topic: string) => void;
  initialText?: string; 
}

export const CreateTopicForm: React.FC<CreateTopicFormProps> = ({ open, onClose, onSave, initialText }) => {
  const [topic, setTopic] = useState('');
  // Atualiza o estado do tópico sempre que initialText mudar
  useEffect(() => {
    setTopic(initialText || '');
  }, [initialText]);
  
  const handleSave = () => {
    if (topic.trim()) {
      onSave(topic);
      setTopic('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialText ? 'Editar Tópico' : 'Criar Tópico'}</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '400px' }}>
          <Typography variant="body1" gutterBottom>
            Novo tópico:
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
