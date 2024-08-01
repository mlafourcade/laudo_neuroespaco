import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface CreateTextFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
}

export const CreateTextForm: React.FC<CreateTextFormProps> = ({ open, onClose, onSave }) => {
  const [text, setText] = useState('');

  const handleSave = () => {
    if (text.trim()) {
      onSave(text);
      setText('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Novo Texto"
          type="text"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  )
}
