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
  deleteTopic: (id: string) => void;
  updateTopic: (id: string, newQuestion: string) => void;
  addAnswerToTopic: (topicId: string, answerText: string) => void;
  updateAnswerToTopic: (topicId: string, answerId: string, newAnswerText: string) => void;
  deleteAnswer: (topicId: string, answerId: string) => void; // Função para deletar resposta
  addTextToAnswer: (answerId: string, textContent: string) => void;
  updateTextToAnswer: (answerId: string, newTextContent: string) => void;
  deleteTextFromAnswer: (topicId: string, answerId: string) => void; // Função para deletar texto de uma resposta
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

  // Função para deletar um tópico
  const deleteTopic = (id: string) => {
    setTopics((prevTopics) => prevTopics.filter(topic => topic.id !== id));
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

  // Função para deletar uma resposta de um tópico
  const deleteAnswer = (topicId: string, answerId: string) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              answers: topic.answers.filter(answer => answer.id !== answerId),
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

  // Função para deletar o texto de uma resposta
  const deleteTextFromAnswer = (topicId: string, answerId: string) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              answers: topic.answers.map((answer) =>
                answer.id === answerId
                  ? {
                      ...answer,
                      responseText: undefined // Ou pode ser '' para uma string vazia
                    }
                  : answer
              ),
            }
          : topic
      )
    );
  };

  // Função para adicionar um modelo
  const addModel = (model: Model) => {
    setModels((prevModels) => [...prevModels, model]);
  };

  return (
    <DataContext.Provider
      value={{
        topics,
        models,
        addTopic,
        deleteTopic,
        updateTopic,
        addAnswerToTopic,
        updateAnswerToTopic,
        deleteAnswer,
        addTextToAnswer,
        updateTextToAnswer,
        deleteTextFromAnswer,
        addModel,
        setModels
      }}
    >
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
