import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useData } from '../contexts/DataContext';

interface PatientFormProps {
  onClose: () => void;
}

export const PatientForm: React.FC<PatientFormProps> = ({ onClose }) => {
  const { addPaciente } = useData();
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState<number | string>('');
  const [sexo, setSexo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    const novoPaciente = {
      id: Date.now().toString(),
      nome,
      idade: Number(idade),
      sexo,
      endereco,
      telefone,
      email,
    };
    addPaciente(novoPaciente);
    onClose(); // Fecha o formulário após salvar
  };

  return (
    <Paper sx={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Cadastro de Paciente
      </Typography>
      <TextField
        label="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Idade"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        fullWidth
        margin="normal"
        type="number"
      />
      <TextField
        label="Sexo"
        value={sexo}
        onChange={(e) => setSexo(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button variant="contained" color="secondary" onClick={onClose} sx={{ marginRight: '10px' }}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Salvar
        </Button>
      </Box>
    </Paper>
  );
};
