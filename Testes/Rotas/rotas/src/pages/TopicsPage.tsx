// src/pages/TopicsPage.tsx
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { View, Text, Button, TouchableOpacity, Alert, FlatList } from 'react-native';
import { pageStyles } from '../styles/PageStyles';
import { CreateTopicForm } from '../componentes/CreateTopicForm'; // Supondo que você tenha esse componente

export const TopicsPage: React.FC = () => {
  const { topics, addTopic, deleteTopic, updateTopic } = useData(); // Usando contexto para acessar tópicos globais e função de adicionar tópicos
  const [open, setOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<{ id: string; question: string } | null>(null);

  const handleCreateClick = () => {
    setOpen(true);
  };

  const handleEditClick = (topic: { id: string; question: string }) => {
    setCurrentTopic(topic);
    setOpen(true);
  };

  const handleDeleteClick = (topicId: string) => {
    Alert.alert('Deletar Tópico', 'Tem certeza que deseja deletar este tópico?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Deletar',
        onPress: () => deleteTopic(topicId), // Chama a função de deletar o tópico
      },
    ]);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTopic(null);
  };

  const handleSave = (topicQuestion: string) => {
    if (currentTopic) {
      updateTopic(currentTopic.id, topicQuestion); // Atualiza o tópico existente
    } else {
      addTopic({ id: Date.now().toString(), question: topicQuestion, answers: [] }); // Cria um novo tópico
    }
    setOpen(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={pageStyles.text}>Tópicos</Text>
      <Button title="Criar" onPress={handleCreateClick} />

      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={({ item: topic }) => (
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 4,
              marginBottom: 10,
              padding: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>{topic.question}</Text>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => handleEditClick(topic)} style={{ marginRight: 10 }}>
                  <Text style={{ color: 'blue' }}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteClick(topic.id)}>
                  <Text style={{ color: 'red' }}>Deletar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <CreateTopicForm
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        initialText={currentTopic?.question || ''}
      />
    </View>
  );
};
