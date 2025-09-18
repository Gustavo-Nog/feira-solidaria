import api from "./api";

const listarProdutos = async () => {
  try {
    const response = await api.get("/api/produtos");   
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao listar produtos: ${error.message}`);
  }
};

const buscarProduto = async (id) => {
  try {
    const response = await api.get(`/api/produtos/${Number(id)}`); 
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao buscar produto: ${error.message}`);
  }
};

const criarProduto = async (payload) => {
  try {
    const response = await api.post("/api/produtos", payload);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao criar produto: ${error.message}`);
  }
};

const atualizarProduto = async (id, payload) => {
  try {
    const response = await api.put(`/api/produtos/${Number(id)}`, payload);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao atualizar produto: ${error.message}`);
  }
};

const deletarProduto = async (id) => {
  try {
    const response = await api.delete(`/api/produtos/${Number(id)}`);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao deletar produto: ${error.message}`);
  }
};

const totalProdutos = async () => {
  try { 
    const response = await api.get('/api/total-produtos');
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao obter o total de produtos: ${error.message}`);
  } 
};
 
export default {
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto,
  totalProdutos
};

