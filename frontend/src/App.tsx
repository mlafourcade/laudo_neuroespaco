import React from 'react';
import { MainMenu } from './componentes/mainMenu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TopicsPage } from './pages/TopicsPage';
import { HomePage } from './pages/HomePage';
import { AnswersPage } from './pages/AnswersPage';
import { TextsPage } from './pages/TextsPage';
import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <DataProvider>
      <Router>
        <MainMenu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/topicos" element={<TopicsPage />} />
          <Route path="/respostas" element={<AnswersPage />} />
          <Route path="/texts" element={<TextsPage />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
