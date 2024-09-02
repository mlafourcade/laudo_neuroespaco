import React, { createContext, useContext, useState } from 'react';

// Definições de tipos
export type Answer = {
  id: string;
  text: string;
  responseText?: string;
}

export type Topic = {
  id: string;
  question: string;
  answers: Answer[];
}

export type Model = {
  id: string;
  name: string;
  content: { text: string, positions: { topicId: string, position: number }[] }[];
}

export type DataContextType = {
  topics: Topic[];
  models: Model[];
  addTopic: (topic: Topic) => void;
  deleteTopic: (id: string) => void; // Nova função para deletar tópicos
  updateTopic: (id: string, newQuestion: string) => void;
  addAnswerToTopic: (topicId: string, answerText: string) => void;
  updateAnswerToTopic: (topicId: string, answerId: string, newAnswerText: string) => void;
  addTextToAnswer: (answerId: string, textContent: string) => void;
  updateTextToAnswer: (answerId: string, newAnswerText: string) => void;
  addModel: (model: Model) => void;
  setModels: (models: Model[]) => void;
}

// Criação do contexto
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provedor de contexto
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [models, setModels] = useState<Model[]>([]);

  // Função para adicionar um tópico
  const addTopic = (topic: Topic) => {
    setTopics((prevTopics) => [...prevTopics, topic]);
  };

  const deleteTopic = (id: string) => {
    setTopics(topics.filter(topic => topic.id !== id)); // Filtra o tópico que não deve ser deletado
  };

  // Função para editar um tópico
  const updateTopic = (id: string, newQuestion: string) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === id ? { ...topic, question: newQuestion } : topic
      )
    );
  };

  // Função para adicionar uma resposta a um tópico
  const addAnswerToTopic = (topicId: string, answerText: string) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              answers: [...topic.answers, { id: Date.now().toString(), text: answerText }],
            }
          : topic
      )
    );
  };

  // Função para atualizar uma resposta existente em um tópico
  const updateAnswerToTopic = (topicId: string, answerId: string, newAnswerText: string) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              answers: topic.answers.map((answer) =>
                answer.id === answerId
                  ? { ...answer, text: newAnswerText }
                  : answer
              ),
            }
          : topic
      )
    );
  };

  // Função para adicionar um texto a uma resposta
  const addTextToAnswer = (answerId: string, textContent: string) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) => ({
        ...topic,
        answers: topic.answers.map((answer) =>
          answer.id === answerId
            ? { ...answer, responseText: textContent }
            : answer
        ),
      }))
    );
  };

  // Função para atualizar o texto de uma resposta existente
  const updateTextToAnswer = (answerId: string, newTextContent: string) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) => ({
        ...topic,
        answers: topic.answers.map((answer) =>
          answer.id === answerId
            ? { ...answer, responseText: newTextContent }
            : answer
        ),
      }))
    );
  };

  // Função para adicionar um modelo
  const addModel = (model: Model) => {
    setModels((prevModels) => [...prevModels, model]);
  };

  return (
    <DataContext.Provider value={{ topics, models, addTopic, deleteTopic, updateTopic, addAnswerToTopic, updateAnswerToTopic, addTextToAnswer, updateTextToAnswer, addModel, setModels }}>
      {children}
    </DataContext.Provider>
  );
};

// Hook para usar o contexto
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
