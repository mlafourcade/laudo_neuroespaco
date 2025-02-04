import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { pageStyles } from '../styles/PageStyles'; // Supondo que você tenha esses estilos

interface TextTopicContainerProps {
  topic: {
    id: string;
    question: string;
    answers: {
      id: string;
      text: string;
      responseText?: string;
    }[];
  };
  onAddText: (topicId: string, answerId: string) => void;
  onEditText?: (topicId: string, answerId: string, existingText: string) => void;
  onDeleteText?: (topicId: string, answerId: string) => void;
}

export const TextTopicContainer: React.FC<TextTopicContainerProps> = ({ topic, onAddText, onEditText, onDeleteText }) => {
  return (
    <View style={styles.container}>
      <Text style={pageStyles.text}>{topic.question}</Text>
      {topic.answers.map((answer) => (
        <View key={answer.id} style={styles.answerContainer}>
          <View style={styles.answerTextContainer}>
            <Text style={styles.answerText}>{answer.text}</Text>
            <TouchableOpacity
              onPress={() => onAddText(topic.id, answer.id)}
              disabled={!!answer.responseText}
              style={[
                styles.button,
                answer.responseText && styles.buttonDisabled
              ]}
            >
              <Text style={styles.buttonText}>
                {answer.responseText ? 'Texto Criado' : 'Criar Texto'}
              </Text>
            </TouchableOpacity>
          </View>
          {answer.responseText && (
            <View style={styles.responseContainer}>
              <Text style={styles.responseText}>{answer.responseText}</Text>
              {onEditText && (
                <TouchableOpacity
                  onPress={() => onEditText(topic.id, answer.id, answer.responseText || '')}
                  style={styles.editButton}
                >
                  <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>
              )}
              {onDeleteText && (
                <TouchableOpacity
                  onPress={() => onDeleteText(topic.id, answer.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteText}>Excluir</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  answerContainer: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#fafafa',
  },
  answerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  answerText: {
    flex: 1,
    fontSize: 16,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  responseContainer: {
    marginTop: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  responseText: {
    flex: 1,
    fontSize: 14,
  },
  editButton: {
    marginLeft: 8,
    backgroundColor: '#FFC107',
    padding: 8,
    borderRadius: 5,
  },
  editText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    marginLeft: 8,
    backgroundColor: '#F44336',
    padding: 8,
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
