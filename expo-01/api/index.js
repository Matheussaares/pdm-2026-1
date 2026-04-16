import axios from "axios";

// URL da sua API na Vercel que acabamos de atualizar
const urlBase = "https://api-node-express-crud.vercel.app/tarefa";

export async function getTarefas() {
  const response = await axios.get(urlBase);
  // No seu Express, os dados vem direto no data
  return response.data; 
}

export async function adicionarTarefa(novaTarefa) {
  // Ajustado para 'text', que é como está no seu banco Neon
  const response = await axios.post(urlBase, {
    text: novaTarefa.descricao 
  });
  return response.data;
}

export async function removerTarefa(id) {
  await axios.delete(`${urlBase}/${id}`);
}