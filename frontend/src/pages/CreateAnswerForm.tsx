import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface CreateAnswerFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (answer: string) => void;
}
export const CreateAnswerForm: React.FC<CreateAnswerFormProps> = ({ open, onClose, onSave }) => {
  const [answer, setAnswer] = useState('');

  const handleSave = () => {
    if (answer.trim()) {
      onSave(answer);
      setAnswer('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Criar Nova Resposta</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '400px' }}>
          <Typography variant="body1" gutterBottom>
            Insira a nova resposta:
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
  )
}
