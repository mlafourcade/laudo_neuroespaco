import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { pageStyles } from '../styles/PageStyles'; // Importando os estilos globais

interface CreateAnswerFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (answer: string) => void;
  initialText?: string;
}

export const CreateAnswerForm: React.FC<CreateAnswerFormProps> = ({ open, onClose, onSave, initialText }) => {
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (initialText) {
      setAnswer(initialText);
    }
  }, [initialText]);

  const handleSave = () => {
    if (answer.trim()) {
      console.log('***** handleSave ***** = ', answer);
      onSave(answer);
      setAnswer('');
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
            {initialText ? 'Editar Resposta' : 'Criar Nova Resposta'}
          </Text>
          <TextInput
            style={pageStyles.input}
            value={answer}
            onChangeText={setAnswer}
            placeholder={initialText ? 'Edite a resposta' : 'Insira a nova resposta'}
          />
          <View style={pageStyles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={pageStyles.button}>
              <Text style={pageStyles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={pageStyles.button}>
              <Text style={pageStyles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
