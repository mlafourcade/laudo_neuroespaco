import { router } from 'expo-router'; // Importa o Link do expo-router
import { View, Text, StyleSheet, Button } from 'react-native';

export const ReportPage = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Olá, esta é pagina de Menus!</Text>
      <Button title="Ir para Segunda Página" onPress={() => router.push("/segunda")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
  },
  texto: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
