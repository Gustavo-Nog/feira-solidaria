import api from "./api";

const listarProdutos = async (pagina = 1, filtros = {}) => {
  try {
    const params = new URLSearchParams({ pagina });
    if (filtros.busca) params.append('busca', filtros.busca);
    if (filtros.categoriaId) params.append('categoriaId', filtros.categoriaId);
    if (filtros.qualidade) params.append('qualidade', filtros.qualidade);

    const response = await api.get(`/api/produtos?${params.toString()}`);
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
    const response = await api.get('/api/produtos/total-produtos');
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

