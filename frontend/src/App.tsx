import React from 'react';
import { MainMenu } from './componentes/mainMenu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TopicsPage } from './pages/TopicsPage';
import { AnswersPage } from './pages/AnswersPage';
import { TextsPage } from './pages/TextsPage';
import { DataProvider } from './contexts/DataContext';
import { ModelsPage } from './pages/ModelsPage';
import { LaudosPage } from './pages/LaudosPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DataProvider>
        <Router>
          <MainMenu />
          <Routes>
            <Route path="/" element={<LaudosPage />} />
            <Route path="/topicos" element={<TopicsPage />} />
            <Route path="/respostas" element={<AnswersPage />} />
            <Route path="/texts" element={<TextsPage />} />
            <Route path="/modelos" element={<ModelsPage />} />
          </Routes>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
