import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useData } from '../contexts/DataContext';
import { CreateAnswerForm } from '../componentes/CreateAnswerForm';
import { pageStyles } from '../styles/PageStyles';

export const AnswersPage: React.FC = () => {
  const { topics } = useData();
  const [open, setOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const handleCreateClick = (topicId: string) => {
    setSelectedTopicId(topicId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (answer: string) => {
    if (selectedTopicId) {
      // Supondo que você tem uma função para adicionar uma resposta ao tópico
      console.log(`Resposta salva para o tópico ${selectedTopicId}:`, answer);
      setOpen(false);
    }
  };

  return (
    <View style={pageStyles.container}>
      <Text style={pageStyles.text}>Respostas</Text>
      <FlatList
        data={topics}
        keyExtractor={(topic) => topic.id}
        renderItem={({ item: topic }) => (
          <View style={pageStyles.topicContainer}>
            <Text style={pageStyles.topicTitle}>{topic.question}</Text>
            <FlatList
              data={topic.answers || []}
              keyExtractor={(answer) => answer.id}
              renderItem={({ item: answer }) => (
                <Text style={pageStyles.answerText}>- {answer.text}</Text>
              )}
              style={pageStyles.listContainer}
            />
            <TouchableOpacity
              onPress={() => handleCreateClick(topic.id)}
              style={pageStyles.button}
            >
              <Text style={pageStyles.buttonText}>Criar Resposta</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <CreateAnswerForm open={open} onClose={handleClose} onSave={handleSave} />
    </View>
  );
};
