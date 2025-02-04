import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useData } from '../contexts/DataContext';
import { TextTopicContainer } from '../componentes/TextTopicContainer';
import { pageStyles } from '../styles/PageStyles';

export const TextosScreen: React.FC = () => {
  const { topics, addTextToAnswer, updateTextToAnswer, deleteTextFromAnswer } = useData();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<{ topicId: string; answerId: string } | null>(null);
  const [newText, setNewText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleCreateClick = (topicId: string, answerId: string) => {
    setSelectedAnswer({ topicId, answerId });
    setIsEditing(false);
    setModalVisible(true);
  };

  const handleEditClick = (topicId: string, answerId: string, existingText: string) => {
    setSelectedAnswer({ topicId, answerId });
    setNewText(existingText);
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleDeleteText = (topicId: string, answerId: string) => {
    deleteTextFromAnswer(topicId, answerId);
  };

  const handleClose = () => {
    setModalVisible(false);
    setSelectedAnswer(null);
    setNewText('');
    setIsEditing(false);
  };

  const handleSave = () => {
    if (selectedAnswer) {
      if (isEditing) {
        updateTextToAnswer(selectedAnswer.answerId, newText);
      } else {
        addTextToAnswer(selectedAnswer.answerId, newText);
      }
      handleClose();
    }
  };

  return (
    <View style={pageStyles.container}>
      <Text style={pageStyles.text}>Textos</Text>
      <FlatList
        data={topics}
        keyExtractor={(topic) => topic.id}
        renderItem={({ item: topic }) => (
          <TextTopicContainer
            key={topic.id}
            topic={topic}
            onAddText={handleCreateClick}
            onEditText={handleEditClick}
            onDeleteText={handleDeleteText}
          />
        )}
      />

      {/* Modal de Criação/Edição de Texto */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={pageStyles.modalBackground}>
          <View style={pageStyles.modalContent}>
            <Text style={pageStyles.modalTitle}>
              {isEditing ? 'Editar Texto' : 'Adicionar Texto'}
            </Text>
            <TextInput
              multiline
              style={pageStyles.input}
              value={newText}
              onChangeText={setNewText}
              placeholder="Digite o texto aqui..."
            />
            <View style={pageStyles.buttonContainer}>
              <TouchableOpacity onPress={handleClose} style={pageStyles.button}>
                <Text style={pageStyles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={pageStyles.button}>
                <Text style={pageStyles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
