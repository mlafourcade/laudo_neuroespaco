// src/pages/PatientsPage.tsx
import React, { useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, IconButton, Button, SelectChangeEvent } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

export const PatientsPage: React.FC = () => {
  const { pacientes } = useData();
  const [selectedPacienteId, setSelectedPacienteId] = useState<string>('');
  const navigate = useNavigate();

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedPacienteId(event.target.value as string);
  };

  const handleAddClick = () => {
    navigate('/patient-form'); // Navega para a página do formulário
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Pacientes
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <FormControl fullWidth variant="outlined" sx={{ marginRight: '10px' }}>
          <InputLabel id="select-patient-label">Selecione um Paciente</InputLabel>
          <Select
            labelId="select-patient-label"
            value={selectedPacienteId}
            onChange={handleSelectChange}
            label="Selecione um Paciente"
          >
            {pacientes.length > 0 ? (
              pacientes.map((paciente) => (
                <MenuItem key={paciente.id} value={paciente.id}>
                  {paciente.nome}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                Nenhum paciente cadastrado
              </MenuItem>
            )}
          </Select>
        </FormControl>
        <IconButton color="primary" onClick={handleAddClick}>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};
