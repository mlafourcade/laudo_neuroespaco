import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Paper, Select, MenuItem, SelectChangeEvent, Switch } from '@mui/material';
import { Model, useData } from '../contexts/DataContext';
import { CreateAnswerForm } from './CreateAnswerForm';

export const LaudosPage: React.FC = () => {
  const { models, topics } = useData();
  const [selectedModelId, setSelectedModelId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [switchStates, setSwitchStates] = useState<{ [topicId: string]: string }>({}); // topicId => answerId

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
      // Supondo que você tem uma função para adicionar uma resposta
      // addAnswerToTopic(selectedTopicId, answer);
      setOpen(false);
    }
  };

  const handleSwitchChange = (topicId: string, answerId: string, checked: boolean) => {
    if (checked) {
      // Ativa o switch e desativa os outros switches no mesmo tópico
      setSwitchStates(prev => ({ ...prev, [topicId]: answerId }));
    } else {
      // Desativa o switch
      setSwitchStates(prev => ({ ...prev, [topicId]: '' }));
    }
  };

  const renderModelContent = (model: Model) => {
    return model.content.map((part, index) => {
      const sortedPositions = [...part.positions].sort((a, b) => a.position - b.position);

      let lastIndex = 0;
      const fragments: React.ReactNode[] = [];

      sortedPositions.forEach((position, posIndex) => {
        const start = lastIndex;
        const end = position.position;
        lastIndex = end;

        // Adiciona o texto antes do próximo campo
        const textBefore = part.text.substring(start, end);
        fragments.push(<span key={`text-${index}-${posIndex}`}>{textBefore}</span>);

        // Adiciona o texto da resposta acionada na posição do campo
        const topic = topics.find(t => t.id === position.topicId);
        const activeAnswerId = switchStates[position.topicId];
        const activeAnswer = topic?.answers.find(answer => answer.id === activeAnswerId);
        const textToShow = activeAnswer?.responseText || '';
        fragments.push(
          <span key={`field-${index}-${posIndex}`} style={{ color: 'blue' }}>
            {textToShow}
          </span>
        );
      });

      // Adiciona o texto restante após o último campo
      const remainingText = part.text.substring(lastIndex);
      fragments.push(<span key={`remaining-${index}`}>{remainingText}</span>);

      return <React.Fragment key={index}>{fragments}</React.Fragment>;
    });
  };

  const selectedModel = models.find(model => model.id === selectedModelId);

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
            {selectedModel.content.filter((_, index) => index !== 0).map((item, index) => (
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
                          {topic?.answers.map((answer) => (
                            <ListItem key={answer.id}>
                              <ListItemText primary={answer.text} />
                              <Switch
                                checked={switchStates[position.topicId] === answer.id}
                                onChange={(e) => handleSwitchChange(position.topicId, answer.id, e.target.checked)}
                              />
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
          <Box sx={{ overflowY: 'auto' }}>
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
