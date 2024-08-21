// src/componentes/CreateTextForm.tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface CreateTextFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
}

export const CreateTextForm: React.FC<CreateTextFormProps> = ({ open, onClose, onSave }) => {
  const [text, setText] = useState('');

  const handleSave = () => {
    onSave(text);
    setText('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Adicionar Texto</DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          label="Texto"
          fullWidth
          multiline
          rows={10} // Define uma altura inicial maior
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          InputProps={{
            style: { overflowY: 'auto' } // Adiciona barra de rolagem vertical
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
