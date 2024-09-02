import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface CreateAnswerFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (answer: string) => void;
  initialText?: string; // Novo: permite editar uma resposta existente
}

export const CreateAnswerForm: React.FC<CreateAnswerFormProps> = ({ open, onClose, onSave, initialText }) => {
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (initialText) {
      setAnswer(initialText);
    }
  }, [initialText]);

  const handleSave = () => {

    if (answer.trim()) {
      console.log('***** handleSave ***** = ', answer);
      onSave(answer);
      setAnswer('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialText ? 'Editar Resposta' : 'Criar Nova Resposta'}</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '400px' }}>
          <Typography variant="body1" gutterBottom>
            {initialText ? 'Edite a resposta:' : 'Insira a nova resposta:'}
          </Typography>
          <TextField
            fullWidth
            label="Resposta"
            variant="outlined"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
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
  );
}
