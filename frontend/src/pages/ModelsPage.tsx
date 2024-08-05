import React, { useRef, useState } from 'react';
import { Box, Typography, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useData } from '../contexts/DataContext';

interface Topic {
  id: string;
  question: string;
}

interface TopicPosition {
  topicId: string;
  position: number;
}

interface Model {
  id: string;
  name: string;
  content: string;
  topics: TopicPosition[];
}

export const ModelsPage: React.FC = () => {
  const { topics } = useData();
  const textFieldRef = useRef<HTMLDivElement>(null);
  const [model, setModel] = useState<Model>({
    id: 'modelo1',
    name: '',
    content: '',
    topics: []
  });
  const [open, setOpen] = useState(false);
  const [modelName, setModelName] = useState('');

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const topicId = event.dataTransfer.getData('text');
    const topic = topics.find(t => t.id === topicId);
    if (topic && textFieldRef.current) {
      const range = document.caretRangeFromPoint(event.clientX, event.clientY);
      const topicText = `<span style="color: blue;">{${topic.question}}</span>`;
      const span = document.createElement("span");
      span.innerHTML = topicText;
      if (range) {
        range.insertNode(span);
        setModel(prevModel => ({
          ...prevModel,
          topics: [
            ...prevModel.topics,
            { topicId, position: range.startOffset }
          ]
        }));
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const range = document.caretRangeFromPoint(event.clientX, event.clientY);
    if (range && textFieldRef.current) {
      textFieldRef.current.focus();
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  const handleSave = () => {
    if (textFieldRef.current) {
      const content = textFieldRef.current.innerHTML;
      setModel(prevModel => ({
        ...prevModel,
        content
      }));
      setOpen(true); // Open modal to input model name
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleModelNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModelName(event.target.value);
  };

  const handleSaveModel = () => {
    if (modelName.trim() === '') {
      alert('O nome do modelo não pode estar vazio.');
      return;
    }
    setModel(prevModel => ({
      ...prevModel,
      name: modelName
    }));
    // Here, you would typically send the `model` object to your backend or state management.
    console.log('Modelo salvo:', model);
    handleDialogClose();
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Lateral Esquerda: Lista de Tópicos */}
      <Box
        sx={{
          width: '50%',
          padding: '20px',
          borderRight: '1px solid #ddd',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Tópicos
        </Typography>
        {topics.map((topic) => (
          <Paper
            key={topic.id}
            sx={{
              padding: '16px',
              marginBottom: '10px',
              cursor: 'move',
              backgroundColor: '#fafafa',
            }}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text', topic.id)}
          >
            {topic.question}
          </Paper>
        ))}
      </Box>

      {/* Lateral Direita: Área de Texto */}
      <Box
        sx={{
          width: '50%',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Typography variant="h4" gutterBottom>
          Modelo de Texto
        </Typography>
        <Box
          contentEditable
          ref={textFieldRef}
          sx={{
            width: '100%',
            height: 'calc(100% - 40px)', // Ajuste para o rodapé
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '10px',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap',
            outline: 'none',
            cursor: 'text',
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ marginTop: '10px' }}
        >
          Salvar
        </Button>
      </Box>

      {/* Modal para Nome do Modelo */}
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Nome do Modelo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome do Modelo"
            type="text"
            fullWidth
            variant="outlined"
            value={modelName}
            onChange={handleModelNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveModel} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
