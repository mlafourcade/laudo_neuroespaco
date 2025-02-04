import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import { useData } from '../contexts/DataContext';
import { MaterialIcons } from '@expo/vector-icons';

export const RespostasScreen: React.FC = () => {
  const { topics, addAnswerToTopic, updateAnswerToTopic, deleteAnswer } = useData();
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<{ id: string, text: string } | null>(null);
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    console.log('selectedTopicId', selectedTopicId);
  }, [selectedTopicId]);

  const handleCreateClick = (topicId: string) => {
    setSelectedTopicId(topicId);
    setCurrentAnswer(null);
    setNewAnswer('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewAnswer('');
  };

  const handleSave = () => {
    if (selectedTopicId) {
      if (currentAnswer) {
        updateAnswerToTopic(selectedTopicId, currentAnswer.id, newAnswer);
      } else {
        addAnswerToTopic(selectedTopicId, newAnswer);
      }
    }
    setOpen(false);
    setCurrentAnswer(null);
  };

  const handleEditAnswerClick = (topicId: string, answerId: string, answerText: string) => {
    setCurrentAnswer({ id: answerId, text: answerText });
    setSelectedTopicId(topicId);
    setNewAnswer(answerText);
    setOpen(true);
  };

  const handleDeleteAnswer = (topicId: string, answerId: string) => {
    deleteAnswer(topicId, answerId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Respostas</Text>
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={({ item: topic }) => (
          <View style={styles.topicContainer}>
            <Text style={styles.topicQuestion}>{topic.question}</Text>
            <FlatList
              data={topic.answers}
              keyExtractor={(answer) => answer.id}
              renderItem={({ item: answer }) => (
                <View style={styles.answerContainer}>
                  <Text>{answer.text}</Text>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => handleEditAnswerClick(topic.id, answer.id, answer.text)}>
                      <MaterialIcons name="edit" size={24} color="blue" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteAnswer(topic.id, answer.id)}>
                      <MaterialIcons name="delete" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            <TouchableOpacity style={styles.button} onPress={() => handleCreateClick(topic.id)}>
              <Text style={styles.buttonText}>Criar Resposta</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal para Criar/Editar Resposta */}
      <Modal visible={open} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{currentAnswer ? 'Editar' : 'Criar'} Resposta</Text>
            <TextInput
              style={styles.textInput}
              value={newAnswer}
              onChangeText={setNewAnswer}
              placeholder="Digite a resposta"
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleClose}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  topicContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  topicQuestion: {
    fontSize: 18,
    fontWeight: '600',
  },
  answerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
  },
});


