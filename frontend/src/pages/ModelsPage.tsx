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

interface ContentPart {
  text: string;
  positions: TopicPosition[];
}

interface Model {
  id: string;
  name: string;
  content: ContentPart[];
}

export const ModelsPage: React.FC = () => {
  const { topics, models, addModel } = useData(); // Usando o DataContext para acessar os modelos globais e função de adicionar modelo
  const textFieldRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [modelName, setModelName] = useState('');
  const [modelContent, setModelContent] = useState<ContentPart[]>([]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const topicId = event.dataTransfer.getData('text');
    const topic = topics.find(t => t.id === topicId);
    if (topic && textFieldRef.current) {
      const range = document.caretRangeFromPoint(event.clientX, event.clientY);
      const topicText = `{${topic.question}}`;
      if (range) {
        const span = document.createElement("span");
        span.innerText = topicText;
        span.style.color = 'blue';
        range.insertNode(span);

        const position = range.startOffset;
        setModelContent(prevContent => [
          ...prevContent,
          { text: topicText, positions: [{ topicId, position }] }
        ]);
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
      setOpen(true); // Abrir modal para entrada do nome do modelo
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
  
    if (textFieldRef.current) {
      // Obtém o HTML da área de texto
      const htmlContent = textFieldRef.current.innerHTML;
  
      // Converte HTML para texto e identifica placeholders
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      const textNodes = doc.body.childNodes;
      const contentParts: ContentPart[] = [];
      let currentText = '';
      let positions: TopicPosition[] = [];
  
      textNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          currentText += node.textContent;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;
          if (element.tagName === 'SPAN' && element.style.color === 'blue') {
            // Adiciona o texto atual como uma parte do modelo
            if (currentText) {
              contentParts.push({ text: currentText, positions });
              currentText = '';
              positions = [];
            }
  
            // Adiciona a parte do tópico
            const topicId = topics.find(t => `{${t.question}}` === element.innerText)?.id;
            if (topicId) {
              positions.push({ topicId, position: 0 });
            }
          }
        }
      });
  
      // Adiciona o texto restante
      if (currentText) {
        contentParts.push({ text: currentText, positions });
      }
  
      // Cria o novo modelo com o conteúdo formatado
      const newModel: Model = {
        id: Date.now().toString(), // Usar uma lógica mais robusta para gerar ID em produção
        name: modelName,
        content: contentParts
      };
      
      // Adiciona o modelo ao contexto global
      addModel(newModel);
      console.log('Modelo salvo:', newModel);
      handleDialogClose();
    }
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
