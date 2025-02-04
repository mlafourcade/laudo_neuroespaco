import React, { useState } from 'react';
import { View, Text, FlatList, Button, Modal, TextInput, StyleSheet } from 'react-native';
import { useData } from '../contexts/DataContext';
import { CreateAnswerForm } from '../componentes/CreateAnswerForm';

export const AnswersPage: React.FC = () => {
  const { topics, addAnswerToTopic } = useData(); // Acessando tópicos globais e função de adicionar respostas
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [newAnswer, setNewAnswer] = useState('');

  const handleCreateClick = (topicId: string) => {
    setSelectedTopicId(topicId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewAnswer(''); // Limpa o campo de resposta quando o modal é fechado
  };

  const handleSave = () => {
    if (selectedTopicId && newAnswer.trim()) {
      addAnswerToTopic(selectedTopicId, newAnswer);
      setOpen(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Respostas</Text>
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.topicContainer}>
            <Text style={styles.topicTitle}>{item.question}</Text>
            <FlatList
              data={item.answers}
              keyExtractor={(answer) => answer.id}
              renderItem={({ item }) => (
                <View style={styles.answerContainer}>
                  <Text>{item.text}</Text>
                </View>
              )}
            />
            <Button title="Criar Resposta" onPress={() => handleCreateClick(item.id)} />
          </View>
        )}
      />
      {/* Modal para criar resposta */}
      <Modal
        visible={open}
        animationType="slide"
        transparent={true}
        onRequestClose={handleClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.textInput}
              placeholder="Digite sua resposta"
              value={newAnswer}
              onChangeText={setNewAnswer}
            />
            <Button title="Salvar" onPress={handleSave} />
            <Button title="Cancelar" onPress={handleClose} />
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
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  topicContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answerContainer: {
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
