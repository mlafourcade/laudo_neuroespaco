import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; // Importa o Link do expo-router

const MeuComponente = () => {
  return (
    <View style={styles.container}>
      <Link href="/" style={styles.link}>Pacientes</Link>
      <Text style={styles.texto}>Olá, este é o meu componente!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
  },
  texto: {
    fontSize: 18,
    color: '#333',
  },  
  link: {
    fontSize: 16,
    color: "blue",
    marginTop: 10,
  },
});

export default MeuComponente;