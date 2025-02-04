import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { pageStyles } from '../styles/PageStyles'; // Supondo que você tenha esses estilos

interface CreateTopicFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (topic: string) => void;
  initialText?: string;
}

export const CreateTopicForm: React.FC<CreateTopicFormProps> = ({ open, onClose, onSave, initialText }) => {
  const [topic, setTopic] = useState('');
  
  // Atualiza o estado do tópico sempre que initialText mudar
  useEffect(() => {
    setTopic(initialText || '');
  }, [initialText]);

  const handleSave = () => {
    if (topic.trim()) {
      onSave(topic);
      setTopic('');
      onClose();
    }
  };

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={pageStyles.modalBackground}>
        <View style={pageStyles.modalContent}>
          <Text style={pageStyles.text}>
            {initialText ? 'Editar Tópico' : 'Criar Tópico'}
          </Text>
          <TextInput
            style={pageStyles.input}
            value={topic}
            onChangeText={setTopic}
            placeholder="Digite o tópico"
          />
          <View style={pageStyles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={pageStyles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.button}>
              <Text style={pageStyles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
};
