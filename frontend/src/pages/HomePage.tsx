import React from 'react'
import { Box, Typography } from '@mui/material';

export const HomePage: React.FC = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo à Ferramenta de Modelos de Textos
      </Typography>
      <Typography variant="body1">
        Use as abas do menu para navegar entre as seções. Explore "Tópicos", "Respostas", "Textos" e "Modelos" para criar e gerenciar seu conteúdo.
      </Typography>
    </Box>
  )
}
