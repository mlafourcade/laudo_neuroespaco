import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useData } from '../contexts/DataContext';
import { CreateAnswerForm } from './CreateAnswerForm';
import EditIcon from '@mui/icons-material/Edit';

export const AnswersPage: React.FC = () => {
  const { topics, addAnswerToTopic, updateAnswerToTopic } = useData(); // Acessando tópicos globais e função de adicionar respostas
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<{ id: string, text: string } | null>(null);

  useEffect(() => {
    console.log('selectedTopicId', selectedTopicId);
  }, [selectedTopicId]);

  const handleCreateClick = (topicId: string) => {
    setSelectedTopicId(topicId);
    setCurrentAnswer(null); // Limpa a resposta atual para garantir que estamos criando uma nova
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (answer: string) => {
    console.log('handleSave');
    if (selectedTopicId) {
      if (currentAnswer) {
        updateAnswerToTopic(selectedTopicId, currentAnswer.id, answer); // Atualiza a resposta existente
      }
      else {
        addAnswerToTopic(selectedTopicId, answer); // Adiciona uma nova resposta
      }
    }
    setOpen(false);
    setCurrentAnswer(null); // Limpa a resposta atual após salvar
  };

  const handleEditAnswerClick = (topicId: string, answerId: string, answerText: string) => {
    setCurrentAnswer({ id: answerId, text: answerText }); // Define a resposta atual para edição
    setSelectedTopicId(topicId); // Configura o ID do tópico associado
    setOpen(true);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Respostas
      </Typography>
      {topics.map((topic) => (
        <Box key={topic.id} sx={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <Typography variant="h6">{topic.question}</Typography>
          <List>
            {topic.answers.map((answer) => (
              <ListItem key={answer.id}>
                <ListItemText primary={answer.text} />
                <EditIcon 
                  sx={{ cursor: 'pointer' }} 
                  onClick={() => handleEditAnswerClick(topic.id, answer.id, answer.text)}  
                />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary" onClick={() => handleCreateClick(topic.id)}>
            Criar Resposta
          </Button>
        </Box>
      ))}
      <CreateAnswerForm 
        open={open} 
        onClose={handleClose} 
        onSave={handleSave} 
        initialText={currentAnswer?.text || ''} // Passa o texto da resposta para edição ou vazio se criando nova
      />
    </Box>
  );
};
