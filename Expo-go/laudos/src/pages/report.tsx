// src/pages/ReportPage.tsx
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function ReportPage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Página de Relatórios</Text>
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}