import api from "./api";

const listarProdutos = async () => {
  try {
    const res = await api.get("/api/produtos");   
    return res.data;
  } catch (error) {
    throw new Error(`Falha ao listar produtos: ${error.message}`);
  }
};

const buscarProduto = async (id) => {
  try {
    const res = await api.get(`/api/produtos/${Number(id)}`); 
    return res.data;
  } catch (error) {
    throw new Error(`Falha ao buscar produto: ${error.message}`);
  }
};

const criarProduto = async (payload) => {
  try {
    const res = await api.post("/api/produtos", payload);
    return res.data;
  } catch (error) {
    throw new Error(`Falha ao criar produto: ${error.message}`);
  }
};

const atualizarProduto = async (id, payload) => {
  try {
    const res = await api.put(`/api/produtos/${Number(id)}`, payload);
    return res.data;
  } catch (error) {
    throw new Error(`Falha ao atualizar produto: ${error.message}`);
  }
};

const deletarProduto = async (id) => {
  try {
    const res = await api.delete(`/api/produtos/${Number(id)}`);
    return res.data;
  } catch (error) {
    throw new Error(`Falha ao deletar produto: ${error.message}`);
  }
};

export default {
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto,
};

