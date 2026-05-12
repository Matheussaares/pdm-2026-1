import React, { useState } from "react";
import DraggableItem from "@/components/DraggableItem";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function GostoNaoGosto() {
  // AQUI ESTÁ A MUDANÇA: Trocamos as frutas pelas suas atividades!
  const items = ["Estudar", "Treinar", "Jogar", "Dormir", "Conversar", "Sair"];
  
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Arraste para Gosto ou Não Gosto</Text>

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Limpar Tudo</Text>
        </TouchableOpacity>

        <View style={styles.dragArea}>
          {items.map((item, index) => (
            <DraggableItem key={`${index}-${resetKey}`} item={item} />
          ))}
        </View>

        <View style={styles.dropZones}>
          <View style={styles.dropZone}>
            <Text style={styles.zoneTitle}>👎 Não Gosto</Text> 
          </View>
          <View style={[styles.dropZone, { backgroundColor: "#FFE66D" }]}>
            <Text style={styles.zoneTitle}>👍 Gosto</Text>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  resetButton: {
    alignSelf: "center",
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    zIndex: 10, 
  },
  resetButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  dragArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 40,
    marginBottom: 40,
    zIndex: 10, 
    elevation: 10, 
  },
  dropZones: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    zIndex: 1, 
    elevation: 1,
  },
  dropZone: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#A8E6CF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  zoneTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});