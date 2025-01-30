// src/pages/HomePage.tsx
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomePage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bem-vindo à HomePage!</Text>
      <Button title="Ir para Relatórios" onPress={() => router.push("/report")} />
    </View>
  );
}