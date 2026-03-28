import axios from "axios";

const urlBase = "https://parseapi.back4app.com/classes/Tarefa";

const headers = {
  "X-Parse-Application-Id": "TOWRdyvOChGUZNhzRLECgjsy402f6Et9heXeUijZ",
  "X-Parse-JavaScript-Key": "qfyzZGxqLDUElOYwVAhK7vMVUtlHVZnS28NFopXb",
};

const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

// GET - Listar tarefas
export async function getTarefas() {
  const response = await axios.get(urlBase, {
    headers: headers,
  });
  return response.data.results;
}

// POST - Adicionar nova tarefa
export async function adicionarTarefa(novaTarefa) {
  const response = await axios.post(urlBase, novaTarefa, {
    headers: headersJson,
  });
  return response.data;
}

// PUT - Atualizar tarefa (usado para o Switch de concluída)
export async function atualizarTarefa(id, dadosAtualizados) {
  const response = await axios.put(`${urlBase}/${id}`, dadosAtualizados, {
    headers: headersJson,
  });
  return response.data;
}

// DELETE - Remover tarefa
export async function removerTarefa(id) {
  const response = await axios.delete(`${urlBase}/${id}`, {
    headers: headers,
  });
  return response.data;
}