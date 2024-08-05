// src/context/DataContext.tsx
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

export type DataContextType = {
  topics: Topic[];
  addTopic: (topic: Topic) => void;
  addAnswerToTopic: (topicId: string, answerText: string) => void;
  addTextToAnswer: (topicId: string, answerId: string, textContent: string) => void;
}

// Criação do contexto
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provedor de contexto
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [topics, setTopics] = useState<Topic[]>([]);

  // Função para adicionar um tópico
  const addTopic = (topic: Topic) => {
    setTopics((prevTopics) => [...prevTopics, topic]);
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

  // Função para adicionar um texto a uma resposta
  const addTextToAnswer = (topicId: string, answerId: string, textContent: string) => {
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

  return (
    <DataContext.Provider value={{ topics, addTopic, addAnswerToTopic, addTextToAnswer }}>
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