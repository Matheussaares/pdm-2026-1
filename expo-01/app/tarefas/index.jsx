import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// Importamos as novas funções que criamos no back4app/index.js
import { adicionarTarefa, getTarefas, atualizarTarefa, removerTarefa } from "@/back4app";

export default function TarefasPage() {
  const queryClient = useQueryClient();
  const [descricao, setDescricao] = useState("");

  // QUERY - Buscar tarefas
  const { data, isFetching } = useQuery({
    queryKey: ["tarefas"],
    queryFn: getTarefas,
  });

  // MUTATION - Adicionar
  const mutation = useMutation({
    mutationFn: adicionarTarefa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
  });

  // MUTATION - Atualizar (PUT)
  const mutationUpdate = useMutation({
    mutationFn: ({ id, concluida }) => atualizarTarefa(id, { concluida }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
  });

  // MUTATION - Remover (DELETE)
  const mutationDelete = useMutation({
    mutationFn: (id) => removerTarefa(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
  });

  async function handleAdicionarTarefaPress() {
    if (descricao.trim() === "") {
      Alert.alert("Descrição inválida", "Preencha a descrição da tarefa");
      return;
    }
    // Ao adicionar, garantimos que ela comece como falsa
    mutation.mutate({ descricao, concluida: false });
    setDescricao("");
  }

  return (
    <View style={styles.container}>
      {(isFetching || mutation.isPending || mutationUpdate.isPending || mutationDelete.isPending) && (
        <ActivityIndicator size="large" color="blue" />
      )}

      <TextInput
        style={styles.input}
        placeholder="O que precisa ser feito?"
        value={descricao}
        onChangeText={setDescricao}
      />
      
      <Button
        title="Adicionar Tarefa"
        onPress={handleAdicionarTarefaPress}
        disabled={mutation.isPending}
      />

      <View style={styles.hr} />

      <View style={styles.tasksContainer}>
        {data?.map((t) => (
          <View key={t.objectId} style={styles.taskItem}>
            <View style={styles.taskTextContainer}>
              <Switch
                value={t.concluida}
                onValueChange={(valor) =>
                  mutationUpdate.mutate({ id: t.objectId, concluida: valor })
                }
              />
              <Text style={[styles.taskText, t.concluida && styles.strikethroughText]}>
                {t.descricao}
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => mutationDelete.mutate(t.objectId)}
            >
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  hr: {
    height: 1,
    backgroundColor: "#eee",
    width: "100%",
    marginVertical: 20,
  },
  tasksContainer: {
    width: "100%",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  taskTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  strikethroughText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});