import { useLocalSearchParams, Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function DetalhesTarefa() {
  const { id } = useLocalSearchParams(); 

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Detalhes" }} />
      <View style={styles.card}>
        <Text style={styles.label}>ID do Registro (NeonDB):</Text>
        <Text style={styles.value}>{id}</Text>
        <View style={styles.hr} />
        <Text style={styles.info}>Conforme o quadro do professor Márcio.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 10, elevation: 3 },
  label: { fontWeight: "bold", color: "#666" },
  value: { fontSize: 16, color: "blue", marginTop: 5 },
  hr: { height: 1, backgroundColor: "#eee", marginVertical: 15 },
  info: { fontSize: 14, fontStyle: "italic", color: "#888" }
});