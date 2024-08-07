import React, { useState } from 'react';
import { Box, Typography, Button, SelectChangeEvent, Select, MenuItem, Paper, List, ListItem, ListItemText } from '@mui/material';
import { Model, useData } from '../contexts/DataContext';
import { CreateAnswerForm } from './CreateAnswerForm';

export const LaudosPage: React.FC = () => {
  const { models, topics, addAnswerToTopic } = useData();
  const [selectedModelId, setSelectedModelId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const handleModelChange = (event: SelectChangeEvent<string>) => {
    setSelectedModelId(event.target.value as string);
  };

  const handleCreateClick = (topicId: string) => {
    setSelectedTopicId(topicId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (answer: string) => {
    if (selectedTopicId) {
      addAnswerToTopic(selectedTopicId, answer);
      setOpen(false);
    }
  };

  const selectedModel = models.find(model => model.id === selectedModelId);

  const renderModelContent = (model: Model) => {
    return model.content.map((part, index) => {
      const sortedPositions = [...part.positions].sort((a, b) => a.position - b.position);
  
      let lastIndex = 0;
      const fragments: React.ReactNode[] = [];
  
      sortedPositions.forEach((position, posIndex) => {
        const start = lastIndex;
        const end = position.position;
        lastIndex = end;
  
        // Adiciona o texto antes do próximo tópico
        const textBefore = part.text.substring(start, end);
        fragments.push(<span key={`text-${index}-${posIndex}`}>{textBefore}</span>);
  
        // Adiciona o ID do tópico na posição correta
        fragments.push(
          <span key={`topic-${index}-${posIndex}`} style={{ color: 'blue' }}>
            {position.topicId}
          </span>
        );
      });
  
      // Adiciona o texto restante após o último tópico
      const remainingText = part.text.substring(lastIndex);
      fragments.push(<span key={`remaining-${index}`}>{remainingText}</span>);
  
      return <React.Fragment key={index}>{fragments}</React.Fragment>;
    });
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Lateral Esquerda */}
      <Box
        sx={{
          width: '50%',
          padding: '20px',
          borderRight: '1px solid #ddd',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Laudos
        </Typography>
        <Select
          value={selectedModelId}
          onChange={handleModelChange}
          displayEmpty
          fullWidth
          sx={{ marginBottom: '20px' }}
        >
          <MenuItem value="" disabled>
            Selecione um modelo
          </MenuItem>
          {models.map(model => (
            <MenuItem key={model.id} value={model.id}>
              {model.name}
            </MenuItem>
          ))}
        </Select>
        {selectedModel && (
          <Box sx={{ overflowY: 'auto' }}>
            {selectedModel.content.map((item, index) => (
              <Paper
                key={index}
                sx={{
                  padding: '10px',
                  marginBottom: '10px',
                  border: '1px solid #ddd',
                }}
              >
                <List>
                  {item.positions.map(position => {
                    const topic = topics.find(t => t.id === position.topicId);
                    return (
                      <Box key={position.topicId} sx={{ marginTop: '10px' }}>
                        <Typography variant="subtitle1" color="primary">
                          {topic?.question || 'Tópico não encontrado'}
                        </Typography>
                        {/* Exibindo respostas do tópico */}
                        <List>
                          {topic?.answers.map(answer => (
                            <ListItem key={answer.id}>
                              <ListItemText primary={answer.text} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    );
                  })}
                </List>
              </Paper>
            ))}
          </Box>
        )}
      </Box>

      {/* Lateral Direita */}
      <Box
        sx={{
          width: '50%',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Detalhes do Modelo
        </Typography>
        {selectedModel && (
          <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
            {renderModelContent(selectedModel)}
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 'auto' }}
        >
          Salvar
        </Button>
      </Box>

      {/* Modal para Criar Resposta */}
      <CreateAnswerForm open={open} onClose={handleClose} onSave={handleSave} />
    </Box>
  );
};
